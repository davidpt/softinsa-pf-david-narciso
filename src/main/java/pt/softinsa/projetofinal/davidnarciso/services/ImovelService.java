package pt.softinsa.projetofinal.davidnarciso.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.softinsa.projetofinal.davidnarciso.enums.Categoria;
import pt.softinsa.projetofinal.davidnarciso.enums.Tipo;
import pt.softinsa.projetofinal.davidnarciso.model.Imovel;
import pt.softinsa.projetofinal.davidnarciso.repository.ImovelRepository;

@Service
public class ImovelService {

	@Autowired
	ImovelRepository imovelRepo;

	public Imovel GetImovelByID(String id) {
		return imovelRepo.findImovelById(id);
	}

	public List<Imovel> GetImoveis() {
		return imovelRepo.findAll();
	}

	public List<Imovel> GetImoveisByTipo(String tipo) {

		Tipo t;

		try {
			t = Tipo.valueOf(tipo.trim().toUpperCase());
		} catch (IllegalArgumentException e) {
			System.out.println("Tipo de imóvel não reconhecido: " + tipo);
			return null;
		}

		return imovelRepo.findImoveisByTipo(t.name());
	}

	public List<Imovel> GetImoveisByTipoCategoria(String tipo, String categoria) {

		Tipo _t;
		Categoria _c;

		try {
			_t = Tipo.valueOf(tipo.trim().toUpperCase());
		} catch (IllegalArgumentException e) {
			System.out.println("Tipo de imóvel não reconhecido: " + tipo);
			return null;
		}
		try {
			_c = Categoria.valueOf(categoria.trim().toUpperCase());
		} catch (IllegalArgumentException e) {
			System.out.println("Tipo de categoria não reconhecido: " + categoria);
			return null;
		}
		
		return imovelRepo.findImoveisByTipoCategoria(_t.name(), _c.name());
	}
	
	public List<Imovel> GetImoveisByTipoCategoriaTipologia(String tipo, String categoria, String tipologia) {

		Tipo _t;
		Categoria _c;

		try {
			_t = Tipo.valueOf(tipo.trim().toUpperCase());
		} catch (IllegalArgumentException e) {
			System.out.println("Tipo de imóvel não reconhecido: " + tipo);
			return null;
		}
		try {
			_c = Categoria.valueOf(categoria.trim().toUpperCase());
		} catch (IllegalArgumentException e) {
			System.out.println("Tipo de categoria não reconhecido: " + categoria);
			return null;
		}
		
		return imovelRepo.findImoveisByTipoCategoriaTipologia(_t.name(), _c.name(), tipologia);
	}
	
	public Imovel AddOrUpdateImovel(Imovel i) {
		return imovelRepo.save(i);
	}
	
	public void DeleteImovelByID(String id) {
		imovelRepo.deleteById(id);
	}

}
