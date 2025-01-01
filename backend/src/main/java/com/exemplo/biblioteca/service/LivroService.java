package com.exemplo.biblioteca.service;

import com.exemplo.biblioteca.model.Livro;
import com.exemplo.biblioteca.repository.LivroRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LivroService {

    private final LivroRepository livroRepository;

    public LivroService(LivroRepository livroRepository) {
        this.livroRepository = livroRepository;
    }

    public Livro adicionarLivro(Livro livro) {
        return livroRepository.save(livro);
    }

    public List<Livro> listarLivros() {
        return livroRepository.findAll();
    }

    public Livro atualizarLivro(Long id, Livro novoLivro) {
        return livroRepository.findById(id)
                .map(livro -> {
                    livro.setTitulo(novoLivro.getTitulo());
                    livro.setAutor(novoLivro.getAutor());
                    livro.setAnoPublicacao(novoLivro.getAnoPublicacao());
                    livro.setCategoria(novoLivro.getCategoria());
                    livro.setQuantidade(novoLivro.getQuantidade());
                    return livroRepository.save(livro);
                })
                .orElseThrow(() -> new RuntimeException("Livro não encontrado!"));
    }

    public void deletarLivro(Long id) {
        livroRepository.deleteById(id);
    }
}
