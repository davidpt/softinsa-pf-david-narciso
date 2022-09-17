package pt.softinsa.projetofinal.davidnarciso.services;

import java.io.IOException;

import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import pt.softinsa.projetofinal.davidnarciso.model.Photo;
import pt.softinsa.projetofinal.davidnarciso.repository.PhotoRepository;

@Service
public class PhotoService {

	@Autowired
	private PhotoRepository photoRepo;

	public String addPhoto(MultipartFile file, String type) throws IOException {

		Photo photo = Photo.builder()
				.type(type)
				.image(new Binary(BsonBinarySubType.BINARY, file.getBytes()))
				.build();
		photo = photoRepo.insert(photo);
		return photo.getId();
	}

	public Photo getPhoto(String id) {
		return photoRepo.findPhotoById(id);
	}
	
	public void DeletePhotoByID(String id) {
		photoRepo.deleteById(id);
	}
}