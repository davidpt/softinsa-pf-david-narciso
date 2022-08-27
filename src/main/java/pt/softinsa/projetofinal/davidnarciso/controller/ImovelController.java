package pt.softinsa.projetofinal.davidnarciso.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import lombok.AllArgsConstructor;
import pt.softinsa.projetofinal.davidnarciso.enums.Categoria;
import pt.softinsa.projetofinal.davidnarciso.enums.Estado;
import pt.softinsa.projetofinal.davidnarciso.model.Imovel;
import pt.softinsa.projetofinal.davidnarciso.services.ImovelService;

@Controller
@RestController
@AllArgsConstructor
public class ImovelController {

	@Autowired
	ImovelService imovelService;

	@GetMapping(value = "/")
	public ModelAndView getIndex() {

		ModelAndView model = new ModelAndView("index.html");
		return model;
	}

	@GetMapping(value = "/apartamentos")
	public ModelAndView getApartamentos(@RequestParam(value = "categoria", required = false) String categoria,
			@RequestParam(value = "estado", required = false) String estado) {

		List<Imovel> _imoveis = imovelService.GetApartamentos();

		// Se não reconhecer a categoria deixa o log e passa à frente, lista os
		// resultados sem categoria
		if (categoria != null) {
			Categoria _c = null;

			try {
				_c = Categoria.valueOf(categoria.trim().toUpperCase());
			} catch (IllegalArgumentException e) {
				System.out.println("Tipo de categoria não reconhecido: " + categoria);
			}

			if (_c != null) {
				List<Imovel> _imoFiltrados = new ArrayList<Imovel>();
				for (Imovel i : _imoveis) {
					if (_c.equals(i.getCategoria())) {
						_imoFiltrados.add(i);
					}
				}

				// Colocamos os imóveis filtrados na lista original
				_imoveis = _imoFiltrados;
			}
		}

		if (estado != null) {
			Estado _e = null;

			try {
				_e = Estado.valueOf(estado.trim().toUpperCase());
			} catch (IllegalArgumentException e) {
				System.out.println("Tipo de estado não reconhecido: " + estado);
			}

			if (_e != null) {
				List<Imovel> _imoFiltrados = new ArrayList<Imovel>();
				for (Imovel i : _imoveis) {
					if (_e.equals(i.getEstado())) {
						_imoFiltrados.add(i);
					}
				}

				// Colocamos os imóveis filtrados na lista original
				_imoveis = _imoFiltrados;
			}
		}

		ModelAndView model = new ModelAndView("apartamentos.html");
		model.addObject("imoveis", _imoveis);

		return model;
	}

	@GetMapping(value = "/moradias")
	public ModelAndView getMoradias() {

		ModelAndView model = new ModelAndView("moradias.html");

		return model;
	}

	@GetMapping(value = "/terrenos")
	public ModelAndView getTerrenos() {

		ModelAndView model = new ModelAndView("terrenos.html");

		return model;
	}

}
