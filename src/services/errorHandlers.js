// src/services/errorHandler.js

/**
 * Função para lidar com erros de resposta HTTP.
 *
 * @param {Response} response - Objeto de resposta da fetch API.
 * @returns {Promise<{ success: boolean, error?: string }>} - Retorna um objeto indicando sucesso ou falha com a mensagem de erro.
 */
export async function handleResponseError(response) {
    if (!response.ok) {
        // Tratamento específico para 404
        if (response.status === 404) {
            return { success: false, error: "Recurso não encontrado. Verifique o endereço solicitado." };
        }

        // Tenta extrair a mensagem de erro fornecida pela API
        let errorMessage = "Ocorreu um erro inesperado. Por favor, tente novamente.";
        try {
            const errorData = await response.json();
            if (errorData && errorData.error) {
                errorMessage = errorData.error;
            }
        } catch (e) {
            // Se a resposta não for JSON, mantém a mensagem padrão
        }

        return { success: false, error: `Erro ${response.status}: ${errorMessage}` };
    }

    // Se a resposta estiver OK, retorna um objeto indicando sucesso
    return { success: true };
}

/**
 * Função para lidar com erros de rede ou outros erros inesperados.
 *
 * @param {Error} error - Objeto de erro capturado.
 * @returns {Object} - Objeto contendo o status de sucesso e a mensagem de erro.
 */
export function handleNetworkError(error) {
    // Erro de rede, como falha ao buscar
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        return {
            success: false,
            error: "Não foi possível acessar a API. Verifique sua conexão ou tente novamente mais tarde."
        };
    }

    // Verifica se o erro possui um status específico
    const statusMatch = error.message.match(/Erro (\d+):/);
    const statusCode = statusMatch ? parseInt(statusMatch[1], 10) : null;

    return {
        success: false,
        error: statusCode
            ? `Código ${statusCode}: ${error.message}`
            : "Ocorreu um erro inesperado. Por favor, tente novamente."
    };
}
