package pt.softinsa.projetofinal.davidnarciso.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import pt.softinsa.projetofinal.davidnarciso.model.Photo;
import pt.softinsa.projetofinal.davidnarciso.services.PhotoService;

@RestController
@RequestMapping("/api")
public class PhotoController {

	@Autowired
	PhotoService photoService;

	@GetMapping("/photos/{id}")
	ResponseEntity<Photo> getPhoto(@PathVariable String id) {
		
		Photo photo = photoService.getPhoto(id);
		
		if (photo != null) {
			return new ResponseEntity<Photo>(photo, HttpStatus.OK);
		} else {
			return new ResponseEntity<Photo>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/photos/add")
	ResponseEntity<String> addPhoto(@RequestParam("image") MultipartFile image, @RequestParam("type") String type)
			throws IOException {
		
		String id = photoService.addPhoto(image, type);

		// TODO: Se der problema ao fazer upload retornar um aviso para que possa saber no front-end
		return new ResponseEntity<String>(id, HttpStatus.OK);
	}

	//Apagar um imóvel
	@DeleteMapping("/photos/delete/{id}")
    public ResponseEntity<?> deletePhoto(@PathVariable(value = "id") String id) {
		System.out.println("\n\nRequest to delete photo ID: " + id + "\n\n");
		
        photoService.DeletePhotoByID(id);
        return ResponseEntity.ok().build();
    }
	
}
