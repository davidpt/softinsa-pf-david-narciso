package pt.softinsa.projetofinal.davidnarciso.model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
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
	
	private String titulo;
	private Tipo tipo;
	private String tipologia;
	private Estado estado;
	private String distrito;
	private int ano;
	private int preco;
	private String descricao;
	private ArrayList<String> imagens;
}
