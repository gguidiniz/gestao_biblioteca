import React, { useState, useEffect } from "react";
import axios from "axios";

const EditarLivroModal = ({ livro, onLivroEditado }) => {
    const [titulo, setTitulo] = useState("");
    const [autor, setAutor] = useState("");
    const [anoPublicacao, setAnoPublicacao] = useState("");
    const [categoria, setCategoria] = useState("");
    const [quantidade, setQuantidade] = useState("");

    useEffect(() => {
        if (livro) {
            setTitulo(livro.titulo);
            setAutor(livro.autor);
            setAnoPublicacao(livro.anoPublicacao);
            setCategoria(livro.categoria);
            setQuantidade(livro.quantidade);
        }
    }, [livro]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const livroEditado = {
            titulo,
            autor,
            anoPublicacao,
            categoria,
            quantidade: parseInt(quantidade),
        };

        axios.put(`http://localhost:8080/livros/${livro.id}`, livroEditado)
            .then(() => {
                alert("Livro atualizado com sucesso!");
                onLivroEditado();
                document.getElementById("closeEditModalButton").click(); // Fecha o modal
            })
            .catch((error) => {
                console.error("Erro ao editar livro:", error);
                alert("Erro ao editar livro. Verifique os campos.");
            });
    };

    return (
        <div
            className="modal fade"
            id="editarLivroModal"
            tabIndex="-1"
            aria-labelledby="editarLivroModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header bg-warning text-white">
                        <h5 className="modal-title" id="editarLivroModalLabel">Editar Livro</h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            id="closeEditModalButton"
                        ></button>
                    </div>
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
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                            >
                                Cancelar
                            </button>
                            <button type="submit" className="btn btn-success">
                                Salvar Alterações
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditarLivroModal;
