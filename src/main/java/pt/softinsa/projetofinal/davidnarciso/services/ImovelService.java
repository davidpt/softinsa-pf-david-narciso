package pt.softinsa.projetofinal.davidnarciso.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import pt.softinsa.projetofinal.davidnarciso.enums.Tipo;
import pt.softinsa.projetofinal.davidnarciso.model.Imovel;
import pt.softinsa.projetofinal.davidnarciso.repository.ImovelRepository;

@Service
public class ImovelService {

	@Autowired
	ImovelRepository imovelRepo;
	
	public List<Imovel> GetApartamentos() {
		return imovelRepo.findImovelByTipo(Tipo.APARTAMENTO.name());
		
	}
	
}
