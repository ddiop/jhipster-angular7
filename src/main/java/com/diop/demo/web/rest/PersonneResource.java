package com.diop.demo.web.rest;
import com.diop.demo.domain.Personne;
import com.diop.demo.service.PersonneService;
import com.diop.demo.web.rest.errors.BadRequestAlertException;
import com.diop.demo.web.rest.util.HeaderUtil;
import com.diop.demo.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Personne.
 */
@RestController
@RequestMapping("/api")
public class PersonneResource {

    private final Logger log = LoggerFactory.getLogger(PersonneResource.class);

    private static final String ENTITY_NAME = "personne";

    private final PersonneService personneService;

    public PersonneResource(PersonneService personneService) {
        this.personneService = personneService;
    }

    /**
     * POST  /personnes : Create a new personne.
     *
     * @param personne the personne to create
     * @return the ResponseEntity with status 201 (Created) and with body the new personne, or with status 400 (Bad Request) if the personne has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/personnes")
    public ResponseEntity<Personne> createPersonne(@Valid @RequestBody Personne personne) throws URISyntaxException {
        log.debug("REST request to save Personne : {}", personne);
        if (personne.getId() != null) {
            throw new BadRequestAlertException("A new personne cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Personne result = personneService.save(personne);
        return ResponseEntity.created(new URI("/api/personnes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /personnes : Updates an existing personne.
     *
     * @param personne the personne to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated personne,
     * or with status 400 (Bad Request) if the personne is not valid,
     * or with status 500 (Internal Server Error) if the personne couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/personnes")
    public ResponseEntity<Personne> updatePersonne(@Valid @RequestBody Personne personne) throws URISyntaxException {
        log.debug("REST request to update Personne : {}", personne);
        if (personne.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Personne result = personneService.save(personne);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, personne.getId().toString()))
            .body(result);
    }

    /**
     * GET  /personnes : get all the personnes.
     *
     * @param pageable the pagination information
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many)
     * @return the ResponseEntity with status 200 (OK) and the list of personnes in body
     */
    @GetMapping("/personnes")
    public ResponseEntity<List<Personne>> getAllPersonnes(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Personnes");
        Page<Personne> page;
        if (eagerload) {
            page = personneService.findAllWithEagerRelationships(pageable);
        } else {
            page = personneService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, String.format("/api/personnes?eagerload=%b", eagerload));
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /personnes/:id : get the "id" personne.
     *
     * @param id the id of the personne to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the personne, or with status 404 (Not Found)
     */
    @GetMapping("/personnes/{id}")
    public ResponseEntity<Personne> getPersonne(@PathVariable Long id) {
        log.debug("REST request to get Personne : {}", id);
        Optional<Personne> personne = personneService.findOne(id);
        return ResponseUtil.wrapOrNotFound(personne);
    }

    /**
     * DELETE  /personnes/:id : delete the "id" personne.
     *
     * @param id the id of the personne to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/personnes/{id}")
    public ResponseEntity<Void> deletePersonne(@PathVariable Long id) {
        log.debug("REST request to delete Personne : {}", id);
        personneService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
