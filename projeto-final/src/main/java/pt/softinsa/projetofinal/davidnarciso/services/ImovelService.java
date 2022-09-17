package pt.softinsa.projetofinal.davidnarciso.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.softinsa.projetofinal.davidnarciso.enums.Tipo;
import pt.softinsa.projetofinal.davidnarciso.model.Imovel;
import pt.softinsa.projetofinal.davidnarciso.repository.ImovelRepository;
import pt.softinsa.projetofinal.davidnarciso.repository.PhotoRepository;

@Service
public class ImovelService {

	@Autowired
	ImovelRepository imovelRepo;
 
	@Autowired
	PhotoRepository photoRepo;
	
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
	
	public Imovel AddOrUpdateImovel(Imovel i) {
		return imovelRepo.save(i);
	}
	
	public void DeleteImovelByID(String id) {
		Imovel i = imovelRepo.findImovelById(id);
		
		//Apaga as imagens associadas 
		for (String s: i.getImagens()) 
		{ 
		    photoRepo.deleteById(s);
		}
		
		imovelRepo.deleteById(id);
	}

}
