package pt.softinsa.projetofinal.davidnarciso.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import pt.softinsa.projetofinal.davidnarciso.model.Imovel;

public interface ImovelRepository extends MongoRepository<Imovel, String> {

	//Se posso passar uma query em string posso manipulá-la em runtime
	static String _query = "{tipo:'?0', categoria:'?1', tipologia:'?2'}";
	
	Imovel findImovelById(String id);

	List<Imovel> findImoveisByTipo(String tipo);
	
	@Query("{tipo:'?0', categoria:'?1'}")
	List<Imovel> findImoveisByTipoCategoria(String tipo, String categoria);

	@Query(_query)
	List<Imovel> findImoveisByTipoCategoriaTipologia(String tipo, String categoria, String tipologia);
	
	//QUERY PARA ENCONTRAR DOIS TIPOS DE IMOVEL
	//{tipo:{$in:["APARTAMENTO","MORADIA"]}}
}
