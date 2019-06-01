package com.diop.demo.web.rest;
import com.diop.demo.domain.ImageBase64;
import com.diop.demo.repository.ImageBase64Repository;
import com.diop.demo.web.rest.errors.BadRequestAlertException;
import com.diop.demo.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing ImageBase64.
 */
@RestController
@RequestMapping("/api")
public class ImageBase64Resource {

    private final Logger log = LoggerFactory.getLogger(ImageBase64Resource.class);

    private static final String ENTITY_NAME = "imageBase64";

    private final ImageBase64Repository imageBase64Repository;

    public ImageBase64Resource(ImageBase64Repository imageBase64Repository) {
        this.imageBase64Repository = imageBase64Repository;
    }

    /**
     * POST  /image-base-64-s : Create a new imageBase64.
     *
     * @param imageBase64 the imageBase64 to create
     * @return the ResponseEntity with status 201 (Created) and with body the new imageBase64, or with status 400 (Bad Request) if the imageBase64 has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/image-base-64-s")
    public ResponseEntity<ImageBase64> createImageBase64(@RequestBody ImageBase64 imageBase64) throws URISyntaxException {
        log.debug("REST request to save ImageBase64 : {}", imageBase64);
        if (imageBase64.getId() != null) {
            throw new BadRequestAlertException("A new imageBase64 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ImageBase64 result = imageBase64Repository.save(imageBase64);
        return ResponseEntity.created(new URI("/api/image-base-64-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /image-base-64-s : Updates an existing imageBase64.
     *
     * @param imageBase64 the imageBase64 to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated imageBase64,
     * or with status 400 (Bad Request) if the imageBase64 is not valid,
     * or with status 500 (Internal Server Error) if the imageBase64 couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/image-base-64-s")
    public ResponseEntity<ImageBase64> updateImageBase64(@RequestBody ImageBase64 imageBase64) throws URISyntaxException {
        log.debug("REST request to update ImageBase64 : {}", imageBase64);
        if (imageBase64.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ImageBase64 result = imageBase64Repository.save(imageBase64);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, imageBase64.getId().toString()))
            .body(result);
    }

    /**
     * GET  /image-base-64-s : get all the imageBase64S.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of imageBase64S in body
     */
    @GetMapping("/image-base-64-s")
    public List<ImageBase64> getAllImageBase64S() {
        log.debug("REST request to get all ImageBase64S");
        return imageBase64Repository.findAll();
    }

    /**
     * GET  /image-base-64-s/:id : get the "id" imageBase64.
     *
     * @param id the id of the imageBase64 to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the imageBase64, or with status 404 (Not Found)
     */
    @GetMapping("/image-base-64-s/{id}")
    public ResponseEntity<ImageBase64> getImageBase64(@PathVariable Long id) {
        log.debug("REST request to get ImageBase64 : {}", id);
        Optional<ImageBase64> imageBase64 = imageBase64Repository.findById(id);
        return ResponseUtil.wrapOrNotFound(imageBase64);
    }

    /**
     * DELETE  /image-base-64-s/:id : delete the "id" imageBase64.
     *
     * @param id the id of the imageBase64 to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/image-base-64-s/{id}")
    public ResponseEntity<Void> deleteImageBase64(@PathVariable Long id) {
        log.debug("REST request to delete ImageBase64 : {}", id);
        imageBase64Repository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
