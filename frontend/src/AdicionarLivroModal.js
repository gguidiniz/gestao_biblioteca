import React, { useState } from "react";
import axios from "axios";

const AdicionarLivroModal = ({ onLivroAdicionado }) => {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [anoPublicacao, setAnoPublicacao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [quantidade, setQuantidade] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const novoLivro = { titulo, autor, anoPublicacao, categoria, quantidade: parseInt(quantidade) };

        axios.post("http://localhost:8080/livros", novoLivro)
            .then(() => {
                alert("Livro adicionado com sucesso!");
                onLivroAdicionado();
                setTitulo("");
                setAutor("");
                setAnoPublicacao("");
                setCategoria("");
                setQuantidade("");
                document.getElementById("closeModalButton").click(); // Fecha o modal
            })
            .catch((error) => {
                console.error("Erro ao adicionar livro:", error);
                alert("Erro ao adicionar livro. Verifique os campos.");
            });
    };

    return (
        <div
            className="modal fade"
            id="adicionarLivroModal"
            tabIndex="-1"
            aria-labelledby="adicionarLivroModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    {/* Cabeçalho do Modal */}
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title" id="adicionarLivroModalLabel">Adicionar Novo Livro</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        ></button>
                    </div>

                    {/* Corpo do Modal */}
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="mb-3">
                                <label className="form-label">Título:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={titulo}
                                    onChange={(e) => setTitulo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Autor:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={autor}
                                    onChange={(e) => setAutor(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Ano de Publicação:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={anoPublicacao}
                                    onChange={(e) => setAnoPublicacao(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Categoria:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={categoria}
                                    onChange={(e) => setCategoria(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Quantidade:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={quantidade}
                                    onChange={(e) => setQuantidade(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Rodapé do Modal */}
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                                id="closeModalButton"
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-success">
                                Adicionar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdicionarLivroModal;
