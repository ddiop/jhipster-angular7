package com.diop.demo.web.rest;
import com.diop.demo.domain.Adresse;
import com.diop.demo.service.AdresseService;
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
 * REST controller for managing Adresse.
 */
@RestController
@RequestMapping("/api")
public class AdresseResource {

    private final Logger log = LoggerFactory.getLogger(AdresseResource.class);

    private static final String ENTITY_NAME = "adresse";

    private final AdresseService adresseService;

    public AdresseResource(AdresseService adresseService) {
        this.adresseService = adresseService;
    }

    /**
     * POST  /adresses : Create a new adresse.
     *
     * @param adresse the adresse to create
     * @return the ResponseEntity with status 201 (Created) and with body the new adresse, or with status 400 (Bad Request) if the adresse has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/adresses")
    public ResponseEntity<Adresse> createAdresse(@RequestBody Adresse adresse) throws URISyntaxException {
        log.debug("REST request to save Adresse : {}", adresse);
        if (adresse.getId() != null) {
            throw new BadRequestAlertException("A new adresse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Adresse result = adresseService.save(adresse);
        return ResponseEntity.created(new URI("/api/adresses/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /adresses : Updates an existing adresse.
     *
     * @param adresse the adresse to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated adresse,
     * or with status 400 (Bad Request) if the adresse is not valid,
     * or with status 500 (Internal Server Error) if the adresse couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/adresses")
    public ResponseEntity<Adresse> updateAdresse(@RequestBody Adresse adresse) throws URISyntaxException {
        log.debug("REST request to update Adresse : {}", adresse);
        if (adresse.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Adresse result = adresseService.save(adresse);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, adresse.getId().toString()))
            .body(result);
    }

    /**
     * GET  /adresses : get all the adresses.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of adresses in body
     */
    @GetMapping("/adresses")
    public List<Adresse> getAllAdresses() {
        log.debug("REST request to get all Adresses");
        return adresseService.findAll();
    }

    /**
     * GET  /adresses/:id : get the "id" adresse.
     *
     * @param id the id of the adresse to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the adresse, or with status 404 (Not Found)
     */
    @GetMapping("/adresses/{id}")
    public ResponseEntity<Adresse> getAdresse(@PathVariable Long id) {
        log.debug("REST request to get Adresse : {}", id);
        Optional<Adresse> adresse = adresseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(adresse);
    }

    /**
     * DELETE  /adresses/:id : delete the "id" adresse.
     *
     * @param id the id of the adresse to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/adresses/{id}")
    public ResponseEntity<Void> deleteAdresse(@PathVariable Long id) {
        log.debug("REST request to delete Adresse : {}", id);
        adresseService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
