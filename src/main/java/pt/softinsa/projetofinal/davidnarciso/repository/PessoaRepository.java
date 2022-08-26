package pt.softinsa.projetofinal.davidnarciso.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import pt.softinsa.projetofinal.davidnarciso.model.Pessoa;

public interface PessoaRepository extends MongoRepository<Pessoa, String> {

	@Query("{nome:'?0'}")
    Pessoa findItemByNome(String nome);
	
	public long count();
	
}
