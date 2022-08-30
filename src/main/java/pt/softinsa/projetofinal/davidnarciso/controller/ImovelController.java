package pt.softinsa.projetofinal.davidnarciso.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import pt.softinsa.projetofinal.davidnarciso.model.Imovel;
import pt.softinsa.projetofinal.davidnarciso.services.ImovelService;

//@Controller
@RestController
// @AllArgsConstructor
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

	// Editar um imóvel
	@PutMapping(value = "/imovel/editar/{id}")
	ResponseEntity<Imovel> updateImovel(@RequestBody Imovel i) {
		System.out.println("\n\nRequest to update imovel: {}" + i + "\n\n");
		Imovel result = imovelService.AddOrUpdateImovel(i);
		return ResponseEntity.ok().body(result);
	}

	// Adicionar um imóvel
	@PostMapping(value = "/imovel/adicionar")
	ResponseEntity<Imovel> addImovel(@RequestBody Imovel i) throws URISyntaxException {
		System.out.println("\n\nRequest to add imovel: {}" + i + "\n\n");
		Imovel result = imovelService.AddOrUpdateImovel(i);
		return ResponseEntity.created(new URI("/api/imovel/" + result.getId())).body(result);
	}

	@GetMapping(value = "/imoveis")
	public Collection<Imovel> getImoveis() {
		return imovelService.GetImoveis();
	}

	@GetMapping(value = "/imoveis/{tipo}")
	public Collection<Imovel> getImoveisTipo(@PathVariable(value = "tipo", required = false) String tipo) {
		return imovelService.GetImoveisByTipo(tipo);
	}

	@GetMapping(value = "/imoveis/{tipo}/{categoria}")
	public Collection<Imovel> getImoveisTipoEstado(@PathVariable(value = "tipo", required = false) String tipo,
			@PathVariable(value = "categoria", required = false) String categoria,
			@RequestParam(value = "estado", required = false) String estado,
			@RequestParam(value = "tipologia", required = false) String tipologia) {

		// TODO: implementar os métodos para os parâmetros passados -> estado e
		// tipologia
		if (tipologia != null) {
			return imovelService.GetImoveisByTipoCategoriaTipologia(tipo, categoria, tipologia);
		} else {
			return imovelService.GetImoveisByTipoCategoria(tipo, categoria);
		}

	}
}
