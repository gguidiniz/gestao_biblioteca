import React, { useState } from "react";
import LivroList from "./LivroList";
import AdicionarLivroModal from "./AdicionarLivroModal";

const App = () => {
    const [reloadLivros, setReloadLivros] = useState(false);

    const handleLivroAdicionado = () => {
        setReloadLivros(!reloadLivros);
    };

    return (
        <>
            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="#">Biblioteca Digital</a>
                </div>
            </nav>

            {/* Conteúdo Principal */}
            <div className="container mt-5">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Lista de Livros</h1>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#adicionarLivroModal"
                    >
                        Adicionar Livro
                    </button>
                </div>
                <AdicionarLivroModal onLivroAdicionado={handleLivroAdicionado} />
                <LivroList reload={reloadLivros} />
            </div>
        </>
    );
};

export default App;
