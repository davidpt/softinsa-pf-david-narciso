package pt.softinsa.projetofinal.davidnarciso.model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import pt.softinsa.projetofinal.davidnarciso.enums.Categoria;
import pt.softinsa.projetofinal.davidnarciso.enums.Estado;
import pt.softinsa.projetofinal.davidnarciso.enums.Tipo;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Imovel {
	
	@Id
	private String id;
	
	private Tipo tipo;
	private Categoria categoria;
	private Estado estado;
	private String tipologia;
	private String pais;
	private String distrito;
	private String concelho;
	private String freguesia;
	private String descricao;
	private int ano;
	private int preco;
	private ArrayList<String> imagens;
	
}
