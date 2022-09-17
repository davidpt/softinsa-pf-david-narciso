package pt.softinsa.projetofinal.davidnarciso.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import pt.softinsa.projetofinal.davidnarciso.model.Photo;

public interface PhotoRepository extends MongoRepository<Photo, String> {
	
	Photo findPhotoById(String id);
	
}