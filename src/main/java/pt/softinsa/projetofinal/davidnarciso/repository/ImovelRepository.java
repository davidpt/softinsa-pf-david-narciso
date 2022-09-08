package pt.softinsa.projetofinal.davidnarciso.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import pt.softinsa.projetofinal.davidnarciso.model.Imovel;

public interface ImovelRepository extends MongoRepository<Imovel, String> {

	Imovel findImovelById(String id);

	List<Imovel> findImoveisByTipo(String tipo);

	@Query("{tipo:'?0', categoria:'?1'}")
	List<Imovel> findImoveisByTipoCategoria(String tipo, String categoria);

	@Query("{tipo:'?0', categoria:'?1', tipologia:'?2'}")
	List<Imovel> findImoveisByTipoCategoriaTipologia(String tipo, String categoria, String tipologia);

	// QUERY PARA ENCONTRAR DOIS TIPOS DE IMOVEL
	// {tipo:{$in:["APARTAMENTO","MORADIA"]}}
}
