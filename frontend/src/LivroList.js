import React, { useEffect, useState } from "react";
import axios from "axios";
import EditarLivroModal from "./EditarLivroModal";

const LivroList = ({ reload }) => {
    const [livros, setLivros] = useState([]);
    const [livroSelecionado, setLivroSelecionado] = useState(null);

    useEffect(() => {
        // Busca todos os livros ao carregar o componente ou quando o estado "reload" muda
        axios.get("http://localhost:8080/livros")
            .then((response) => setLivros(response.data))
            .catch((error) => console.error("Erro ao buscar livros:", error));
    }, [reload]);

    const handleEditarClick = (livro) => {
        // Define o livro selecionado para edição
        setLivroSelecionado(livro);
    };

    const handleLivroEditado = () => {
        // Fecha o formulário de edição e atualiza a lista de livros
        setLivroSelecionado(null);
        axios.get("http://localhost:8080/livros")
            .then((response) => setLivros(response.data))
            .catch((error) => console.error("Erro ao atualizar lista de livros:", error));
    };

    const handleExcluirClick = (id) => {
        // Confirmação para excluir o livro
        if (window.confirm("Tem certeza que deseja excluir este livro?")) {
            axios.delete(`http://localhost:8080/livros/${id}`)
                .then(() => {
                    alert("Livro excluído com sucesso!");
                    setLivros(livros.filter((livro) => livro.id !== id));
                })
                .catch((error) => {
                    console.error("Erro ao excluir livro:", error);
                    alert("Erro ao excluir livro.");
                });
        }
    };

    return (
        <div className="card shadow">
            <div className="card-body">
                {/* Modal para editar livro */}
                <EditarLivroModal livro={livroSelecionado} onLivroEditado={handleLivroEditado} />
                <table className="table table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Título</th>
                            <th>Autor</th>
                            <th>Ano de Publicação</th>
                            <th>Categoria</th>
                            <th>Quantidade</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {livros.map((livro) => (
                            <tr key={livro.id}>
                                <td>{livro.id}</td>
                                <td>{livro.titulo}</td>
                                <td>{livro.autor}</td>
                                <td>{livro.anoPublicacao}</td>
                                <td>{livro.categoria}</td>
                                <td>{livro.quantidade}</td>
                                <td>
                                    <button
                                        className="btn btn-warning btn-sm me-2" // Amarelo para combinar com o modal
                                        data-bs-toggle="modal"
                                        data-bs-target="#editarLivroModal"
                                        onClick={() => handleEditarClick(livro)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleExcluirClick(livro.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default LivroList;
