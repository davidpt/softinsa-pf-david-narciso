package pt.softinsa.projetofinal.davidnarciso.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import pt.softinsa.projetofinal.davidnarciso.model.Imovel;

public interface ImovelRepository extends MongoRepository<Imovel, String> {

	// Não é necessário definir manualmente a query. Vou deixar apenas para
	// o caso de precisar da sintaxe no futuro
	@Query("{id:'?0'}")
	Imovel findImovelById(String id);

	List<Imovel> findImovelByTipo(String tipo);

}
