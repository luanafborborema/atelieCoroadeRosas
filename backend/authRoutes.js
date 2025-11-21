const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('./User');
const verificarToken = require('./auth');

const router = express.Router();

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { name, email, username, password } = req.body;

    if (!name || !email || !username || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const usuarioExistente = await User.findOne({ $or: [{ email }, { username }] });
    if (usuarioExistente) {
      return res.status(400).json({ message: 'E-mail ou usuário já cadastrado' });
    }

    // Verificar se é a primeira conta
    const totalUsers = await User.countDocuments();
    const status = totalUsers === 0 ? 'approved' : 'pending';

    const novoUsuario = new User({
      name,
      email,
      username,
      password,
      status
    });

    await novoUsuario.save();

    if (status === 'approved') {
      res.status(201).json({ 
        message: 'Primeira conta criada e aprovada automaticamente! Você já pode fazer login.',
        isFirstAccount: true 
      });
    } else {
      res.status(201).json({ 
        message: 'Conta criada! Aguarde aprovação de um administrador.',
        isFirstAccount: false 
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar conta: ' + error.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'Preencha todos os campos' });
    }

    const usuario = await User.findOne({ username });

    if (!usuario) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    if (usuario.status !== 'approved') {
      return res.status(401).json({ message: 'Sua conta ainda não foi aprovada' });
    }

    const senhaCorreta = await usuario.compararSenha(password);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Usuário ou senha inválidos' });
    }

    const token = jwt.sign(
      { id: usuario._id, username: usuario.username },
      process.env.JWT_SECRET || 'sua-chave-secreta-super-segura',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        _id: usuario._id,
        name: usuario.name,
        email: usuario.email,
        username: usuario.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao fazer login: ' + error.message });
  }
});

// VALIDATE TOKEN
router.get('/validate', verificarToken, async (req, res) => {
  try {
    const usuario = await User.findById(req.user.id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({
      user: {
        _id: usuario._id,
        name: usuario.name,
        email: usuario.email,
        username: usuario.username
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao validar token: ' + error.message });
  }
});

// LIST ALL USERS
router.get('/list', verificarToken, async (req, res) => {
  try {
    const usuarios = await User.find().select('-password');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao listar usuários: ' + error.message });
  }
});

// GET PROFILE
router.get('/profile', verificarToken, async (req, res) => {
  try {
    const usuario = await User.findById(req.user.id).select('-password');

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter perfil: ' + error.message });
  }
});

// UPDATE PROFILE
router.put('/update', verificarToken, async (req, res) => {
  try {
    const { name, email, username, currentPassword, newPassword } = req.body;
    const usuario = await User.findById(req.user.id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (!currentPassword) {
      return res.status(400).json({ message: 'Senha atual necessária para fazer alterações' });
    }

    const senhaCorreta = await usuario.compararSenha(currentPassword);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha atual incorreta' });
    }

    if (email && email !== usuario.email) {
      const emailExistente = await User.findOne({ email });
      if (emailExistente) {
        return res.status(400).json({ message: 'E-mail já cadastrado' });
      }
      usuario.email = email;
    }

    if (username && username !== usuario.username) {
      const usuarioExistente = await User.findOne({ username });
      if (usuarioExistente) {
        return res.status(400).json({ message: 'Usuário já cadastrado' });
      }
      usuario.username = username;
    }

    if (name) usuario.name = name;

    if (newPassword) {
      usuario.password = newPassword;
    }

    await usuario.save();

    res.json({ message: 'Perfil atualizado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar perfil: ' + error.message });
  }
});

// APPROVE USER
router.post('/approve', verificarToken, async (req, res) => {
  try {
    const { id, adminPassword } = req.body;

    if (!adminPassword) {
      return res.status(400).json({ message: 'Digite sua senha para confirmar' });
    }

    const admin = await User.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({ message: 'Administrador não encontrado' });
    }

    const senhaCorreta = await admin.compararSenha(adminPassword);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha do administrador incorreta' });
    }

    const usuario = await User.findByIdAndUpdate(id, { status: 'approved' }, { new: true });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuário aprovado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao aprovar usuário: ' + error.message });
  }
});

// REJECT/DELETE USER
router.post('/reject', verificarToken, async (req, res) => {
  try {
    const { id } = req.body;

    const usuario = await User.findByIdAndDelete(id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuário rejeitado e deletado' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao rejeitar usuário: ' + error.message });
  }
});

// DELETE USER
router.delete('/delete', verificarToken, async (req, res) => {
  try {
    const { id, adminPassword } = req.body;

    if (!adminPassword) {
      return res.status(400).json({ message: 'Digite sua senha para confirmar' });
    }

    if (id === req.user.id) {
      return res.status(400).json({ message: 'Você não pode deletar sua própria conta' });
    }

    const admin = await User.findById(req.user.id);

    if (!admin) {
      return res.status(404).json({ message: 'Administrador não encontrado' });
    }

    const senhaCorreta = await admin.compararSenha(adminPassword);

    if (!senhaCorreta) {
      return res.status(401).json({ message: 'Senha do administrador incorreta' });
    }

    const usuario = await User.findByIdAndDelete(id);

    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    res.json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar usuário: ' + error.message });
  }
});

module.exports = router;
