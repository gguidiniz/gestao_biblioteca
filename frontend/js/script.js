// script.js

// Referências aos elementos do HTML
const cardContainer = document.getElementById('cardContainer');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');

// Array para armazenar os livros vindos do back-end
let livros = [];

/* =========================================
   CARREGAR E RENDERIZAR
========================================= */

// Carregar os livros do servidor
async function loadLivros() {
    try {
        // Faz requisição GET para buscar todos os livros
        const response = await fetch('http://localhost:8080/livros');
        livros = await response.json();
        renderLivros();
    } catch (error) {
        console.error('Erro ao carregar livros:', error);
    }
}

// Renderizar os livros na tela (cria dinamicamente os cards)
function renderLivros() {
    cardContainer.innerHTML = ''; // Limpa o container antes de renderizar

    livros.forEach((livro) => {
        // Cria a div do card
        const card = document.createElement('div');
        card.className = 'card';

        // Exemplo de exibição (título, autor, etc.)
        const tituloEl = document.createElement('h3');
        tituloEl.textContent = livro.titulo;
        card.appendChild(tituloEl);

        const autorEl = document.createElement('p');
        autorEl.textContent = `Autor: ${livro.autor}`;
        card.appendChild(autorEl);

        const anoEl = document.createElement('p');
        anoEl.textContent = `Ano: ${livro.anoPublicacao}`;
        card.appendChild(anoEl);

        const categoriaEl = document.createElement('p');
        categoriaEl.textContent = `Categoria: ${livro.categoria}`;
        card.appendChild(categoriaEl);

        const quantidadeEl = document.createElement('p');
        quantidadeEl.textContent = `Quantidade: ${livro.quantidade}`;
        card.appendChild(quantidadeEl);

        // Botão para Editar
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.onclick = () => editLivro(livro);
        card.appendChild(editButton);

        // Botão para Deletar
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.className = 'excluir';
        deleteButton.onclick = () => deleteLivro(livro.id);
        card.appendChild(deleteButton);

        // Adiciona o card no container
        cardContainer.appendChild(card);
    });
}

/* =========================================
   ADICIONAR
========================================= */

async function addLivro() {
    // Coleta valores do formulário
    const titulo = document.getElementById('tituloInput').value;
    const autor = document.getElementById('autorInput').value;
    const anoPublicacao = document.getElementById('anoPublicacaoInput').value;
    const categoria = document.getElementById('categoriaInput').value;
    const quantidade = document.getElementById('quantidadeInput').value;

    if (titulo && autor && anoPublicacao && categoria && quantidade) {
        // Monta objeto livro
        const novoLivro = {
            titulo: titulo,
            autor: autor,
            anoPublicacao: parseInt(anoPublicacao),
            categoria: categoria,
            quantidade: parseInt(quantidade)
        };

        try {
            // Faz requisição POST para /livros
            const response = await fetch('http://localhost:8080/livros', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoLivro),
            });

            if (response.ok) {
                // Recarrega lista de livros
                await loadLivros();
                // Limpa o formulário
                clearForm();
            } else {
                console.error('Erro ao adicionar livro:', await response.text());
                alert('Erro ao adicionar livro. Verifique os campos e tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar livro:', error);
            alert('Falha de conexão com o servidor.');
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

/* =========================================
   EDITAR
========================================= */

function editLivro(livro) {
    // Pré-preenche o formulário com os dados do livro a ser editado
    document.getElementById('tituloInput').value = livro.titulo;
    document.getElementById('autorInput').value = livro.autor;
    document.getElementById('anoPublicacaoInput').value = livro.anoPublicacao;
    document.getElementById('categoriaInput').value = livro.categoria;
    document.getElementById('quantidadeInput').value = livro.quantidade;

    // Atualiza o título do formulário para "Editar Livro"
    document.getElementById('formTitle').textContent = 'Editar Livro';

    // Muda o texto do botão para "Salvar Alterações"
    const addButton = document.querySelector('.form-container button');
    addButton.textContent = 'Salvar Alterações';
    // Atualiza o onclick para chamar saveEdit()
    addButton.onclick = () => saveEdit(livro.id);

    // Exibe o botão "Cancelar"
    const cancelButton = document.getElementById('cancelButton');
    cancelButton.style.display = 'inline-block';
}

async function saveEdit(id) {
    // Pega os valores do formulário
    const titulo = document.getElementById('tituloInput').value;
    const autor = document.getElementById('autorInput').value;
    const anoPublicacao = document.getElementById('anoPublicacaoInput').value;
    const categoria = document.getElementById('categoriaInput').value;
    const quantidade = document.getElementById('quantidadeInput').value;

    const livroAtualizado = {
        titulo: titulo,
        autor: autor,
        anoPublicacao: parseInt(anoPublicacao),
        categoria: categoria,
        quantidade: parseInt(quantidade)
    };

    try {
        // Envia requisição PUT para /livros/{id}
        const response = await fetch(`http://localhost:8080/livros/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(livroAtualizado),
        });

        if (response.ok) {
            // Recarrega a lista de livros
            await loadLivros();
            // Limpa o formulário e restaura o título e botão
            resetForm();
        } else {
            console.error('Erro ao editar livro:', await response.text());
            alert('Erro ao editar livro. Verifique os campos e tente novamente.');
        }
    } catch (error) {
        console.error('Erro ao editar livro:', error);
        alert('Falha de conexão com o servidor.');
    }
}

/* =========================================
   EXCLUIR
========================================= */

async function deleteLivro(id) {
    if (confirm('Tem certeza que deseja excluir este livro?')) {
        try {
            // DELETE em /livros/{id}
            const response = await fetch(`http://localhost:8080/livros/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                loadLivros();
            } else {
                console.error('Erro ao excluir livro:', await response.text());
                alert('Erro ao excluir livro. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao excluir livro:', error);
            alert('Falha de conexão com o servidor.');
        }
    }
}

/* =========================================
   LIMPAR FORMULÁRIO
========================================= */

function clearForm() {
    document.getElementById('tituloInput').value = '';
    document.getElementById('autorInput').value = '';
    document.getElementById('anoPublicacaoInput').value = '';
    document.getElementById('categoriaInput').value = '';
    document.getElementById('quantidadeInput').value = '';
}

function resetForm() {
    // Limpa os campos do formulário
    clearForm();

    // Restaura o título do formulário
    document.getElementById('formTitle').textContent = 'Cadastrar Livro';

    // Restaura o botão para "Adicionar Livro"
    const addButton = document.querySelector('.form-container button');
    addButton.textContent = 'Adicionar Livro';
    addButton.onclick = addLivro;

    // Esconde o botão "Cancelar"
    const cancelButton = document.getElementById('cancelButton');
    cancelButton.style.display = 'none';
}

/* =========================================
   TEMA CLARO/ESCURO
========================================= */
toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

/* =========================================
   INICIALIZAÇÃO
========================================= */
loadLivros();
