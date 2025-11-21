const API_URL = (location.hostname === 'localhost' || location.hostname === '127.0.0.1') ? 'http://localhost:5000' : 'https://seu-backend.com';

let currentUser = null;
let currentProductId = null;
let autoRefreshInterval = null;
let currentTab = null;

document.addEventListener('DOMContentLoaded', () => {
    inicializarEventos();
    verificarLoginCacheado();
});

function inicializarEventos() {
    // Login
    document.getElementById('loginForm').addEventListener('submit', fazerLogin);
    document.getElementById('linkCriarConta').addEventListener('click', irParaCriarConta);
    
    // Register
    document.getElementById('registerForm').addEventListener('submit', criarConta);
    document.getElementById('linkVoltarLogin').addEventListener('click', voltarParaLogin);
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', logout);
    
    // Navegação
    document.querySelectorAll('.nav-item').forEach(btn => {
        btn.addEventListener('click', () => abrirAba(btn.getAttribute('data-tab')));
    });
    
    // Produtos
    document.getElementById('addProductBtn').addEventListener('click', abrirNovoProduct);
    document.getElementById('productForm').addEventListener('submit', salvarProduto);
    
    // Contatos
    document.getElementById('contactsForm').addEventListener('submit', salvarContatos);
    
    // Perfil
    document.getElementById('profileForm').addEventListener('submit', salvarPerfil);
    
    // Admin Tabs
    document.querySelectorAll('.admins-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => abrirAbaAdmin(btn.getAttribute('data-admin-tab')));
    });
    
    // Confirm Modal
    document.getElementById('cancelBtn').addEventListener('click', fecharConfirm);
}

function verificarLoginCacheado() {
    const token = localStorage.getItem('adminToken');
    if (token) {
        validarToken(token);
    }
}

async function fazerLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            alert(data.message || 'Erro ao fazer login');
            return;
        }
        
        localStorage.setItem('adminToken', data.token);
        currentUser = data.user;
        mostrarPainel();
    } catch (error) {
        alert('Erro ao conectar com o servidor: ' + error.message);
    }
}

async function validarToken(token) {
    try {
        const response = await fetch(`${API_URL}/api/auth/validate`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            const data = await response.json();
            currentUser = data.user;
            mostrarPainel();
        } else {
            localStorage.removeItem('adminToken');
        }
    } catch (error) {
        console.error('Erro ao validar token:', error);
    }
}

function irParaCriarConta(e) {
    e.preventDefault();
    document.getElementById('loginContainer').classList.remove('active');
    document.getElementById('registerContainer').classList.add('active');
}

function voltarParaLogin(e) {
    e.preventDefault();
    document.getElementById('registerContainer').classList.remove('active');
    document.getElementById('loginContainer').classList.add('active');
}

async function criarConta(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('As senhas não correspondem');
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, username, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            alert(data.message || 'Erro ao criar conta');
            return;
        }
        
        if (data.isFirstAccount) {
            alert('Primeira conta criada com sucesso! Você será redirecionado para o login.');
        } else {
            alert('Conta criada! Um administrador aprovará sua solicitação em breve.');
        }
        
        document.getElementById('registerForm').reset();
        voltarParaLogin({ preventDefault: () => {} });
    } catch (error) {
        alert('Erro ao conectar com o servidor: ' + error.message);
    }
}

function logout() {
    // Limpar auto-refresh
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    }
    
    localStorage.removeItem('adminToken');
    currentUser = null;
    document.getElementById('loginContainer').classList.add('active');
    document.getElementById('adminPanel').classList.remove('active');
    document.getElementById('loginForm').reset();
    document.getElementById('registerForm').reset();
}

function mostrarPainel() {
    document.getElementById('loginContainer').classList.remove('active');
    document.getElementById('registerContainer').classList.remove('active');
    document.getElementById('adminPanel').classList.add('active');
    document.getElementById('adminUsername').textContent = currentUser.name;
    carregarDadosPainel();
}

async function carregarDadosPainel() {
    const token = localStorage.getItem('adminToken');
    
    try {
        // Carregar contagem de produtos
        const prodResponse = await fetch(`${API_URL}/api/products/list`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (prodResponse.ok) {
            const products = await prodResponse.json();
            document.getElementById('productsCount').textContent = products.length;
        }
        
        // Carregar contagem de admins
        const adminResponse = await fetch(`${API_URL}/api/auth/list`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (adminResponse.ok) {
            const admins = await adminResponse.json();
            document.getElementById('adminsCount').textContent = admins.filter(a => a.status === 'approved').length;
        }
    } catch (error) {
        console.error('Erro ao carregar dados do painel:', error);
    }
}

function abrirAba(tabName) {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
    
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    currentTab = tabName;
    
    // Limpar auto-refresh anterior
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    }
    
    if (tabName === 'products') {
        carregarProdutos();
    } else if (tabName === 'admins') {
        // Recarregar imediatamente e depois a cada 5 segundos
        carregarAdmins();
        autoRefreshInterval = setInterval(() => {
            if (currentTab === 'admins') {
                carregarAdmins();
            }
        }, 5000); // 5 segundos
    } else if (tabName === 'contacts') {
        carregarContatos();
    } else if (tabName === 'profile') {
        carregarPerfil();
    }
}

function abrirAbaDados(tabName) {
    document.querySelectorAll('.nav-item').forEach(el => {
        if (el.getAttribute('data-tab') === tabName) {
            el.classList.add('active');
        } else {
            el.classList.remove('active');
        }
    });
    
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.getElementById(tabName).classList.add('active');
}

/* PRODUTOS */
async function carregarProdutos() {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/api/products/list`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Erro ao carregar produtos');
        
        const products = await response.json();
        const tbody = document.getElementById('productsTableBody');
        tbody.innerHTML = '';
        
        products.forEach(product => {
            const row = document.createElement('tr');
            const imagem = product.imagens && product.imagens[0] ? product.imagens[0] : 'sem-imagem.jpg';
            row.innerHTML = `
                <td>${product.nome}</td>
                <td>${product.categoria}</td>
                <td>R$ ${product.preco.toFixed(2).replace('.', ',')}</td>
                <td><img src="${imagem}" alt="${product.nome}" style="max-width: 60px; height: auto; border-radius: 5px;"></td>
                <td>
                    <div class="table-actions">
                        <button class="btn-edit" onclick="editarProduto('${product._id}')">Editar</button>
                        <button class="btn-delete" onclick="confirmarDelecao('produto', '${product._id}', '${product.nome}')">Excluir</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        alert('Erro ao carregar produtos: ' + error.message);
    }
}

function abrirNovoProduct() {
    currentProductId = null;
    document.getElementById('productModalTitle').textContent = 'Novo Produto';
    document.getElementById('productForm').reset();
    document.getElementById('productModal').classList.add('active');
}

function fecharModalProduto() {
    document.getElementById('productModal').classList.remove('active');
    document.getElementById('productForm').reset();
    currentProductId = null;
}

async function editarProduto(id) {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/api/products/${id}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Erro ao carregar produto');
        
        const product = await response.json();
        
        currentProductId = product._id;
        document.getElementById('productName').value = product.nome;
        document.getElementById('productCategory').value = product.categoria;
        document.getElementById('productPrice').value = product.preco;
        document.getElementById('productDescription').value = product.descricao || '';
        document.getElementById('productImages').value = product.imagens ? product.imagens.join(', ') : '';
        document.getElementById('productBeadsAveMaria').value = product.pedrasAveMaria || '';
        document.getElementById('productBeadsPaiNosso').value = product.pedrasPaiNosso || '';
        document.getElementById('productCrucifixDetails').value = product.detalhesCrucifixo || '';
        document.getElementById('productDivision').value = product.divisao || '';
        
        document.getElementById('productModalTitle').textContent = 'Editar Produto';
        document.getElementById('productModal').classList.add('active');
    } catch (error) {
        alert('Erro ao carregar produto: ' + error.message);
    }
}

async function salvarProduto(e) {
    e.preventDefault();
    
    const token = localStorage.getItem('adminToken');
    
    const productData = {
        nome: document.getElementById('productName').value,
        categoria: document.getElementById('productCategory').value,
        preco: parseFloat(document.getElementById('productPrice').value),
        descricao: document.getElementById('productDescription').value,
        imagens: document.getElementById('productImages').value.split(',').map(url => url.trim()).filter(url => url),
        pedrasAveMaria: document.getElementById('productBeadsAveMaria').value,
        pedrasPaiNosso: document.getElementById('productBeadsPaiNosso').value,
        detalhesCrucifixo: document.getElementById('productCrucifixDetails').value,
        divisao: document.getElementById('productDivision').value
    };
    
    try {
        let response;
        
        if (currentProductId) {
            response = await fetch(`${API_URL}/api/products/update`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id: currentProductId, ...productData })
            });
        } else {
            response = await fetch(`${API_URL}/api/products/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(productData)
            });
        }
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Erro ao salvar produto');
        }
        
        alert('Produto salvo com sucesso!');
        fecharModalProduto();
        carregarProdutos();
    } catch (error) {
        alert('Erro ao salvar produto: ' + error.message);
    }
}

/* CONTATOS */
async function carregarContatos() {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/api/contacts/get`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            const contacts = await response.json();
            document.getElementById('contactWhatsApp').value = contacts.whatsapp || '';
            document.getElementById('contactInstagramLoja').value = contacts.instagramLoja || '';
            document.getElementById('contactInstagramPessoal').value = contacts.instagramPessoal || '';
            document.getElementById('contactEmail').value = contacts.email || '';
            document.getElementById('contactAddress').value = contacts.endereco || '';
        }
    } catch (error) {
        console.error('Erro ao carregar contatos:', error);
    }
}

async function salvarContatos(e) {
    e.preventDefault();
    
    const token = localStorage.getItem('adminToken');
    
    const contactsData = {
        whatsapp: document.getElementById('contactWhatsApp').value,
        instagramLoja: document.getElementById('contactInstagramLoja').value,
        instagramPessoal: document.getElementById('contactInstagramPessoal').value,
        email: document.getElementById('contactEmail').value,
        endereco: document.getElementById('contactAddress').value
    };
    
    try {
        const response = await fetch(`${API_URL}/api/contacts/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(contactsData)
        });
        
        if (!response.ok) {
            throw new Error('Erro ao salvar contatos');
        }
        
        alert('Dados de contato salvos com sucesso!');
    } catch (error) {
        alert('Erro ao salvar contatos: ' + error.message);
    }
}

/* ADMINS */
async function carregarAdmins() {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/api/auth/list`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) throw new Error('Erro ao carregar administradores');
        
        const admins = await response.json();
        
        const pendingBody = document.getElementById('pendingAdminsTableBody');
        const approvedBody = document.getElementById('approvedAdminsTableBody');
        
        pendingBody.innerHTML = '';
        approvedBody.innerHTML = '';
        
        admins.forEach(admin => {
            const row = document.createElement('tr');
            const dataCriacao = new Date(admin.dataCriacao).toLocaleDateString('pt-BR');
            
            if (admin.status === 'pending') {
                row.innerHTML = `
                    <td>${admin.name}</td>
                    <td>${admin.username}</td>
                    <td>${admin.email}</td>
                    <td>${dataCriacao}</td>
                    <td>
                        <div class="table-actions">
                            <button class="btn-approve" onclick="aprovarAdmin('${admin._id}')">Aprovar</button>
                            <button class="btn-reject" onclick="confirmarDelecao('admin', '${admin._id}', '${admin.name}')">Rejeitar</button>
                        </div>
                    </td>
                `;
                pendingBody.appendChild(row);
            } else if (admin.status === 'approved') {
                row.innerHTML = `
                    <td>${admin.name}</td>
                    <td>${admin.username}</td>
                    <td>${admin.email}</td>
                    <td>${dataCriacao}</td>
                    <td>
                        <div class="table-actions">
                            ${admin._id !== currentUser._id ? `<button class="btn-delete" onclick="confirmarDelecao('admin', '${admin._id}', '${admin.name}')">Excluir</button>` : '<span style="color: #999;">Sua conta</span>'}
                        </div>
                    </td>
                `;
                approvedBody.appendChild(row);
            }
        });
    } catch (error) {
        alert('Erro ao carregar administradores: ' + error.message);
    }
}

async function aprovarAdmin(id) {
    const token = localStorage.getItem('adminToken');
    const adminPassword = prompt('Digite sua senha para confirmar aprovação:');
    
    if (!adminPassword) {
        return;
    }
    
    try {
        const response = await fetch(`${API_URL}/api/auth/approve`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id, adminPassword })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            alert(data.message || 'Erro ao aprovar administrador');
            return;
        }
        
        alert('Administrador aprovado com sucesso!');
        carregarAdmins();
    } catch (error) {
        alert('Erro ao aprovar: ' + error.message);
    }
}

function abrirAbaAdmin(tabName) {
    document.querySelectorAll('.admin-tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.admins-tab-btn').forEach(el => el.classList.remove('active'));
    
    if (tabName === 'pending') {
        document.getElementById('pendingAdmins').classList.add('active');
    } else {
        document.getElementById('approvedAdmins').classList.add('active');
    }
    event.target.classList.add('active');
}

/* PERFIL */
async function carregarPerfil() {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/api/auth/profile`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (response.ok) {
            const user = await response.json();
            document.getElementById('profileName').value = user.name;
            document.getElementById('profileEmail').value = user.email;
            document.getElementById('profileUsername').value = user.username;
        }
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
    }
}

async function salvarPerfil(e) {
    e.preventDefault();
    
    const token = localStorage.getItem('adminToken');
    
    const name = document.getElementById('profileName').value;
    const email = document.getElementById('profileEmail').value;
    const username = document.getElementById('profileUsername').value;
    const currentPassword = document.getElementById('profileCurrentPassword').value;
    const newPassword = document.getElementById('profileNewPassword').value;
    const confirmPassword = document.getElementById('profileConfirmPassword').value;
    
    if (!currentPassword) {
        alert('Digite sua senha atual para fazer alterações');
        return;
    }
    
    if (newPassword && newPassword !== confirmPassword) {
        alert('As novas senhas não correspondem');
        return;
    }
    
    const profileData = {
        name,
        email,
        username,
        currentPassword
    };
    
    if (newPassword) {
        profileData.newPassword = newPassword;
    }
    
    try {
        const response = await fetch(`${API_URL}/api/auth/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profileData)
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.message || 'Erro ao salvar perfil');
        }
        
        alert('Perfil atualizado com sucesso!');
        document.getElementById('profileCurrentPassword').value = '';
        document.getElementById('profileNewPassword').value = '';
        document.getElementById('profileConfirmPassword').value = '';
    } catch (error) {
        alert('Erro ao salvar perfil: ' + error.message);
    }
}

/* CONFIRMAÇÃO */
function confirmarDelecao(tipo, id, nome) {
    const modal = document.getElementById('confirmModal');
    const title = document.getElementById('confirmTitle');
    const message = document.getElementById('confirmMessage');
    const confirmBtn = document.getElementById('confirmBtn');
    
    if (tipo === 'produto') {
        title.textContent = 'Excluir Produto';
        message.textContent = `Tem certeza que deseja excluir o produto "${nome}"? Esta ação não pode ser desfeita.`;
    } else if (tipo === 'admin') {
        title.textContent = 'Excluir Administrador';
        message.textContent = `Tem certeza que deseja excluir a conta de "${nome}"? Esta ação não pode ser desfeita.`;
    }
    
    confirmBtn.onclick = () => {
        if (tipo === 'produto') {
            deletarProduto(id);
        } else if (tipo === 'admin') {
            deletarAdmin(id);
        }
        fecharConfirm();
    };
    
    modal.classList.add('active');
}

function fecharConfirm() {
    document.getElementById('confirmModal').classList.remove('active');
}

async function deletarProduto(id) {
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/api/products/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id })
        });
        
        if (!response.ok) throw new Error('Erro ao excluir produto');
        
        alert('Produto excluído com sucesso!');
        carregarProdutos();
    } catch (error) {
        alert('Erro ao excluir produto: ' + error.message);
    }
}

async function deletarAdmin(id) {
    const adminPassword = prompt('Digite sua senha para confirmar exclusão:');
    
    if (!adminPassword) {
        return;
    }
    
    const token = localStorage.getItem('adminToken');
    
    try {
        const response = await fetch(`${API_URL}/api/auth/delete`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ id, adminPassword })
        });
        
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.message || 'Erro ao excluir administrador');
        
        alert('Administrador excluído com sucesso!');
        carregarAdmins();
    } catch (error) {
        alert('Erro ao excluir administrador: ' + error.message);
    }
}
