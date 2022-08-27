package pt.softinsa.projetofinal.davidnarciso;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DavidNarcisoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DavidNarcisoApplication.class, args);
	}
	/*
	@Override
	public void run(String... args) throws Exception {

//		System.out.println("-------------CREATE IMOVEL ITEMS-------------------------------\n");
//
//		createImovelItems();
//
//		System.out.println("\n----------------SHOW ALL IMOVEL ITEMS---------------------------\n");
//
//		showAllImovelItems();

		Tipo _t = Tipo.MORADIA;
		
		List<Imovel> _i = imovelRepo.findImovelByTipo(_t.name());
		System.out.println("O conteudo da pesquisa do tipo de imoveis " + _t.name() + " é: " + _i);

	}

	void getImovelByID() {
		
		String _id = "630a4aacc44e75782efa80c7";
		System.out.println("Getting imovel by id: " + _id);
		Imovel _i = imovelRepo.findImovelById(_id);
		System.out.println("O conteudo do documento imovel é: " + _i);
	}
	
	void createImovelItems() {
		
		System.out.println("Data creation started...");
		imovelRepo.save(Imovel.builder().tipo(Tipo.MORADIA).estado(Estado.USADO).pais("Portugal").distrito("Santarém")
				.descricao("Bom apartamento para férias").ano(2003).preco(750000)
				.imagens(new ArrayList<String>(List.of("imagem1", "imagem2"))).build());

		System.out.println("Data creation complete...");
		
	}

	public void showAllImovelItems() {

		List<Imovel> imoveis = new ArrayList<Imovel>();
		imoveis = imovelRepo.findAll();

		System.out.println("O conteudo de imoveis é: " + imoveis);
	}
	*/
}
