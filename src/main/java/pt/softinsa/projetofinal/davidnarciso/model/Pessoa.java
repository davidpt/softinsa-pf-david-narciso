package pt.softinsa.projetofinal.davidnarciso.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document
public class Pessoa {
	
	@Id
	private String id;
	
	private String nome;
	private String apelido;
}
