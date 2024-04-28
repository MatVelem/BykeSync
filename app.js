import express from 'express';
import mysql from 'mysql2';
import config from './config.js';
import bodyParser from 'body-parser';

const app = express();

// Middleware para processar corpos de requisição
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection(config);

app.get('/', (req, res) => {
    res.send('Página inicial');
});

app.use(express.json());

app.get('/bicicletas', (req, res) => {
    // Lógica para lidar com a rota GET /bicicletas
});

app.get('/bicicletas/:id', (req, res) => {
    // Lógica para lidar com a rota GET /bicicletas/:id
});

app.post('/bicicletas', (req, res) => {
    // Lógica para lidar com a rota POST /bicicletas
});

app.put('/bicicletas/:id', (req, res) => {
    // Lógica para lidar com a rota PUT /bicicletas/:id
});

app.delete('/bicicletas/:id', (req, res) => {
    // Lógica para lidar com a rota DELETE /bicicletas/:id
});

app.post('/usuarios', async (req, res) => {
    // Lógica para lidar com a rota POST /usuarios
});

app.get('/usuarios/:id', async (req, res) => {
    // Lógica para lidar com a rota GET /usuarios/:id
});

const PORT = process.env.PORT || 3006;
app.listen(PORT, () => console.log(`Servidor em execução na porta ${PORT}`));


app.post('/form', (req, res) => {
    const { obrigatorio, naoObrigatorio, email } = req.body;

    // Validar campos obrigatórios
    if (!obrigatorio) {
        return res.status(400).json({ error: 'Campo obrigatório não fornecido' });
    }

    // Validar tipos válidos
    if (email && !isValidEmail(email)) {
        return res.status(400).json({ error: 'Endereço de e-mail inválido' });
    }

    // Se todos os campos passarem pelas validações, continue com o processamento
    // Seu código para lidar com os dados do formulário...
});

function isValidEmail(email) {
    // Implemente sua lógica de validação de e-mail aqui
    // Esta é apenas uma implementação de exemplo básica
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Middleware para processar corpos de requisição
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para excluir um registro
app.delete('/registros/:id', (req, res) => {
    const id = req.params.id;
    // Verificar se o usuário confirmou a exclusão
    const confirmacao = req.query.confirmacao; // Se estiver usando query string
    // Se a confirmação for verdadeira, exclua o registro
    if (confirmacao === 'true') {
        // Lógica para excluir o registro do banco de dados
        // ...
        res.status(200).send('Registro excluído com sucesso');
    } else {
        // Se o usuário não confirmar, envie uma resposta indicando cancelamento da operação
        res.status(400).send('Exclusão cancelada pelo usuário');
    }
});



app.get('/bicicletas', (req, res) => {
    const searchTerm = req.query.q; // Obter o termo de pesquisa da query da URL
    
    if (!searchTerm) {
        return res.status(400).send('Por favor, forneça um termo de pesquisa.');
    }

    const sql = `
        SELECT * FROM bicicletas
        WHERE marca LIKE ? OR modelo LIKE ? OR cor LIKE ? OR preco LIKE ?
    `;

    const query = `%${searchTerm}%`; // Adicionar wildcards para buscar termos parciais

    connection.query(sql, [query, query, query], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar bicicletas.');
        }
        res.status(200).json(results);
    });
});

app.get('/acessorios', (req, res) => {
    const searchTerm = req.query.q; // Obter o termo de pesquisa da query da URL
    
    if (!searchTerm) {
        return res.status(400).send('Por favor, forneça um termo de pesquisa.');
    }

    const sql = `
        SELECT * FROM acessorios
        WHERE tipo LIKE ? OR marca LIKE ? OR preco LIKE ?
    `;

    const query = `%${searchTerm}%`; // Adicionar wildcards para buscar termos parciais

    connection.query(sql, [query, query], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar acessórios.');
        }
        res.status(200).json(results);
    });
});

app.get('/usuarios', (req, res) => {
    const searchTerm = req.query.q;

    if (!searchTerm) {
        return res.status(400).send('Por favor, forneça um termo de pesquisa.');
    }

    const sql = `
        SELECT * FROM usuarios
        WHERE nome LIKE ? OR email LIKE ? OR senha LIKE ? endereco LIKE ? OR telefone LIKE ?
    `;

    const query = `%${searchTerm}%`;

    connection.query(sql, [query, query], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar usuários.');
        }
        res.status(200).json(results);
    });
});

app.get('/compras', (req, res) => {
    const searchTerm = req.query.q;

    if (!searchTerm) {
        return res.status(400).send('Por favor, forneça um termo de pesquisa.');
    }

    const sql = `
        SELECT * FROM compras
        WHERE status LIKE ?
    `;

    const query = `%${searchTerm}%`;

    connection.query(sql, [query], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar compras.');
        }
        res.status(200).json(results);
    });
});

// Listar todos os serviços de manutenção
app.get('/servicos-manutencao', (req, res) => {
    connection.query('SELECT * FROM servicos_manutencao', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar serviços de manutenção.');
        }
        res.status(200).json(results);
    });
});

// Adicionar um novo serviço de manutenção
app.post('/servicos-manutencao', (req, res) => {
    const { tipo, preco, descricao, tempo_execucao } = req.body;
    const sql = 'INSERT INTO servicos_manutencao (tipo, preco, descricao, tempo_execucao) VALUES (?, ?, ?, ?)';
    connection.query(sql, [tipo, preco, descricao, tempo_execucao], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao adicionar serviço de manutenção.');
        }
        res.status(201).send('Serviço de manutenção adicionado com sucesso.');
    });
});

// Atualizar um serviço de manutenção existente
app.put('/servicos-manutencao/:id', (req, res) => {
    const { tipo, preco, descricao, tempo_execucao } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE servicos_manutencao SET tipo = ?, preco = ?, descricao = ?, tempo_execucao = ? WHERE id = ?';
    connection.query(sql, [tipo, preco, descricao, tempo_execucao, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar serviço de manutenção.');
        }
        res.status(200).send('Serviço de manutenção atualizado com sucesso.');
    });
});

// Remover um serviço de manutenção
app.delete('/servicos-manutencao/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM servicos_manutencao WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao remover serviço de manutenção.');
        }
        res.status(200).send('Serviço de manutenção removido com sucesso.');
    });
});

// Listar todos os mecânicos
app.get('/mecanicos', (req, res) => {
    connection.query('SELECT * FROM mecanicos', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar mecânicos.');
        }
        res.status(200).json(results);
    });
});

// Adicionar um novo mecânico
app.post('/mecanicos', (req, res) => {
    const { nome, email, telefone, especialidades, foto } = req.body;
    const sql = 'INSERT INTO mecanicos (nome, email, telefone, especialidades, foto) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [nome, email, telefone, especialidades, foto], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao adicionar mecânico.');
        }
        res.status(201).send('Mecânico adicionado com sucesso.');
    });
});

// Atualizar um mecânico existente
app.put('/mecanicos/:id', (req, res) => {
    const { nome, email, telefone, especialidades, foto } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE mecanicos SET nome = ?, email = ?, telefone = ?, especialidades = ?, foto = ? WHERE id = ?';
    connection.query(sql, [nome, email, telefone, especialidades, foto, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar mecânico.');
        }
        res.status(200).send('Mecânico atualizado com sucesso.');
    });
});

// Remover um mecânico
app.delete('/mecanicos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM mecanicos WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao remover mecânico.');
        }
        res.status(200).send('Mecânico removido com sucesso.');
    });
});

// Listar todos os agendamentos
app.get('/agendamentos', (req, res) => {
    connection.query('SELECT * FROM agendamentos', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar agendamentos.');
        }
        res.status(200).json(results);
    });
});

// Adicionar um novo agendamento
app.post('/agendamentos', (req, res) => {
    const { data, hora, servico_manutencao_id, usuario_id, mecanico_id, status } = req.body;
    const sql = 'INSERT INTO agendamentos (data, hora, servico_manutencao_id, usuario_id, mecanico_id, status) VALUES (?, ?, ?, ?, ?, ?)';
    connection.query(sql, [data, hora, servico_manutencao_id, usuario_id, mecanico_id, status], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao adicionar agendamento.');
        }
        res.status(201).send('Agendamento adicionado com sucesso.');
    });
});

// Atualizar um agendamento existente
app.put('/agendamentos/:id', (req, res) => {
    const { data, hora, servico_manutencao_id, usuario_id, mecanico_id, status } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE agendamentos SET data = ?, hora = ?, servico_manutencao_id = ?, usuario_id = ?, mecanico_id = ?, status = ? WHERE id = ?';
    connection.query(sql, [data, hora, servico_manutencao_id, usuario_id, mecanico_id, status, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar agendamento.');
        }
        res.status(200).send('Agendamento atualizado com sucesso.');
    });
});

// Remover um agendamento
app.delete('/agendamentos/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM agendamentos WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao remover agendamento.');
        }
        res.status(200).send('Agendamento removido com sucesso.');
    });
});

// Listar todos os aluguéis
app.get('/aluguels', (req, res) => {
    connection.query('SELECT * FROM aluguels', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar aluguéis.');
        }
        res.status(200).json(results);
    });
});

// Adicionar um novo aluguel
app.post('/aluguels', (req, res) => {
    const { bicicleta_id, usuario_id, data_inicio, data_fim, valor_total, status, observacao } = req.body;
    const sql = 'INSERT INTO aluguels (bicicleta_id, usuario_id, data_inicio, data_fim, valor_total, status, observacao) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(sql, [bicicleta_id, usuario_id, data_inicio, data_fim, valor_total, status, observacao], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao adicionar aluguel.');
        }
        res.status(201).send('Aluguel adicionado com sucesso.');
    });
});

// Atualizar um aluguel existente
app.put('/aluguels/:id', (req, res) => {
    const { bicicleta_id, usuario_id, data_inicio, data_fim, valor_total, status, observacao } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE aluguels SET bicicleta_id = ?, usuario_id = ?, data_inicio = ?, data_fim = ?, valor_total = ?, status = ?, observacao = ? WHERE id = ?';
    connection.query(sql, [bicicleta_id, usuario_id, data_inicio, data_fim, valor_total, status, observacao, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar aluguel.');
        }
        res.status(200).send('Aluguel atualizado com sucesso.');
    });
});

// Remover um aluguel
app.delete('/aluguels/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM aluguels WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao remover aluguel.');
        }
        res.status(200).send('Aluguel removido com sucesso.');
    });
});

// Listar todos os tipos de serviço
app.get('/tipos-servico', (req, res) => {
    connection.query('SELECT * FROM tipos_servico', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao buscar tipos de serviço.');
        }
        res.status(200).json(results);
    });
});

// Adicionar um novo tipo de serviço
app.post('/tipos-servico', (req, res) => {
    const { nome, descricao, preco, tempo_estimado, garantia } = req.body;
    const sql = 'INSERT INTO tipos_servico (nome, descricao, preco, tempo_estimado, garantia) VALUES (?, ?, ?, ?, ?)';
    connection.query(sql, [nome, descricao, preco, tempo_estimado, garantia], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao adicionar tipo de serviço.');
        }
        res.status(201).send('Tipo de serviço adicionado com sucesso.');
    });
});

// Atualizar um tipo de serviço existente
app.put('/tipos-servico/:id', (req, res) => {
    const { nome, descricao, preco, tempo_estimado, garantia } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE tipos_servico SET nome = ?, descricao = ?, preco = ?, tempo_estimado = ?, garantia = ? WHERE id = ?';
    connection.query(sql, [nome, descricao, preco, tempo_estimado, garantia, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao atualizar tipo de serviço.');
        }
        res.status(200).send('Tipo de serviço atualizado com sucesso.');
    });
});

// Remover um tipo de serviço
app.delete('/tipos-servico/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tipos_servico WHERE id = ?';
    connection.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erro ao remover tipo de serviço.');
        }
        res.status(200).send('Tipo de serviço removido com sucesso.');
    });
});
