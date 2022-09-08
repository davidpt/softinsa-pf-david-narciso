package pt.softinsa.projetofinal.davidnarciso.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import pt.softinsa.projetofinal.davidnarciso.model.Imovel;
import pt.softinsa.projetofinal.davidnarciso.services.ImovelService;

@RestController
@RequestMapping("/api")
public class ImovelController {

	@Autowired
	ImovelService imovelService;

	@GetMapping(value = "/imovel/{id}")
	ResponseEntity<?> getImovelByID(@PathVariable(value = "id") String id) {

		Imovel _i = imovelService.GetImovelByID(id);

		if (_i != null) {
			return new ResponseEntity<Imovel>(_i, HttpStatus.OK);
		} else {
			return new ResponseEntity<Imovel>(HttpStatus.NOT_FOUND);
		}
	}

	// Atualizar um imóvel
	@PutMapping(value = "/imovel/edit/{id}")
	ResponseEntity<Imovel> updateImovel(@RequestBody Imovel i) {
		System.out.println("\n\nRequest to update imovel: " + i + "\n\n");
		Imovel result = imovelService.AddOrUpdateImovel(i);
		return ResponseEntity.ok().body(result);
	}

	// Adicionar um imóvel
	@PostMapping(value = "/imovel/add")
	ResponseEntity<Imovel> addImovel(@RequestBody Imovel i) throws URISyntaxException {
		System.out.println("\n\nRequest to add imovel: " + i + "\n\n");
		Imovel result = imovelService.AddOrUpdateImovel(i);
		return ResponseEntity.created(new URI("/api/imovel/" + result.getId())).body(result);
	}

	// Apagar um imóvel
	@DeleteMapping("/imovel/delete/{id}")
	public ResponseEntity<?> deleteImovel(@PathVariable(value = "id") String id) {
		System.out.println("\n\nRequest to delete imovel ID: " + id + "\n\n");

		imovelService.DeleteImovelByID(id);
		return ResponseEntity.ok().build();
	}

	@GetMapping(value = "/imoveis")
	public Collection<Imovel> getImoveis() {
		return imovelService.GetImoveis();
	}

	@GetMapping(value = "/imoveis/{tipo}")
	public Collection<Imovel> getImoveisTipo(@PathVariable(value = "tipo", required = false) String tipo) {
		return imovelService.GetImoveisByTipo(tipo);
	}

}
