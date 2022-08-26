package pt.softinsa.projetofinal.davidnarciso;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import pt.softinsa.projetofinal.davidnarciso.model.Pessoa;
import pt.softinsa.projetofinal.davidnarciso.repository.PessoaRepository;

@SpringBootApplication
@EnableMongoRepositories
public class DavidNarcisoApplication implements CommandLineRunner {

	@Autowired
	PessoaRepository pessoaRepo;

	public static void main(String[] args) {
		SpringApplication.run(DavidNarcisoApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		System.out.println("-------------CREATE GROCERY ITEMS-------------------------------\n");
		
		createGroceryItems();
		
		System.out.println("\n----------------SHOW ALL PEOPLE ITEMS---------------------------\n");

		showAllPeopleItems();

	}

	public void showAllPeopleItems() {

		List<Pessoa> pessoas = new ArrayList<Pessoa>();
		pessoas = pessoaRepo.findAll();

		Pessoa p = new Pessoa();
		p = pessoaRepo.findItemByNome("David");
		
		System.out.println("O número de documentos na collection é: " + pessoaRepo.count()
				+ " e o conteudo de pessoas é: " + pessoas + " e o conteudo do document de david é: " + p);

		// pessoaItemRepo.findAll().forEach(item ->
		// System.out.println(getItemDetails(item)));
	}

	public String getItemDetails(Pessoa item) {

		System.out.println("Nome: " + item.getNome() + ", \nApelido: " + item.getApelido());

		return "";
	}
	
	void createGroceryItems() {
        System.out.println("Data creation started...");
        pessoaRepo.save(new Pessoa("4","Whole", "Wheat"));
        pessoaRepo.save(new Pessoa("5","Kodo", "Millet"));
        
        System.out.println("Data creation complete...");
    }

}
