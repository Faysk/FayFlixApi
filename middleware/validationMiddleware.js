/**
 * Middleware de validação que verifica se os dados da requisição atendem a determinados critérios.
 * @param {object} req - O objeto de requisição.
 * @param {object} res - O objeto de resposta.
 * @param {function} next - Função de callback para chamar o próximo middleware na cadeia.
 */
function validationMiddleware(req, res, next) {
    // Verifique se os dados da requisição atendem aos critérios de validação.
    // Por exemplo, você pode verificar se certos campos obrigatórios estão presentes ou se estão no formato correto.
    // Se os dados não atenderem aos critérios, você pode retornar uma resposta de erro diretamente ou chamar next(new Error(...)).
    // Se os dados estiverem corretos, chame next() para prosseguir para o próximo middleware na cadeia.

    // Exemplo de verificação de campo obrigatório
    if (!req.body || !req.body.name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    // Exemplo de verificação de formato de campo
    if (typeof req.body.name !== 'string') {
        return res.status(400).json({ error: 'Name must be a string' });
    }

    // Se tudo estiver correto, chame next() para prosseguir para o próximo middleware
    next();
}

module.exports = validationMiddleware;
