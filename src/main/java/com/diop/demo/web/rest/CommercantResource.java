package com.diop.demo.web.rest;
import com.diop.demo.domain.Commercant;
import com.diop.demo.service.CommercantService;
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
 * REST controller for managing Commercant.
 */
@RestController
@RequestMapping("/api")
public class CommercantResource {

    private final Logger log = LoggerFactory.getLogger(CommercantResource.class);

    private static final String ENTITY_NAME = "commercant";

    private final CommercantService commercantService;

    public CommercantResource(CommercantService commercantService) {
        this.commercantService = commercantService;
    }

    /**
     * POST  /commercants : Create a new commercant.
     *
     * @param commercant the commercant to create
     * @return the ResponseEntity with status 201 (Created) and with body the new commercant, or with status 400 (Bad Request) if the commercant has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/commercants")
    public ResponseEntity<Commercant> createCommercant(@Valid @RequestBody Commercant commercant) throws URISyntaxException {
        log.debug("REST request to save Commercant : {}", commercant);
        if (commercant.getId() != null) {
            throw new BadRequestAlertException("A new commercant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Commercant result = commercantService.save(commercant);
        return ResponseEntity.created(new URI("/api/commercants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /commercants : Updates an existing commercant.
     *
     * @param commercant the commercant to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated commercant,
     * or with status 400 (Bad Request) if the commercant is not valid,
     * or with status 500 (Internal Server Error) if the commercant couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/commercants")
    public ResponseEntity<Commercant> updateCommercant(@Valid @RequestBody Commercant commercant) throws URISyntaxException {
        log.debug("REST request to update Commercant : {}", commercant);
        if (commercant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Commercant result = commercantService.save(commercant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, commercant.getId().toString()))
            .body(result);
    }

    /**
     * GET  /commercants : get all the commercants.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of commercants in body
     */
    @GetMapping("/commercants")
    public ResponseEntity<List<Commercant>> getAllCommercants(Pageable pageable) {
        log.debug("REST request to get a page of Commercants");
        Page<Commercant> page = commercantService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/commercants");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /commercants/:id : get the "id" commercant.
     *
     * @param id the id of the commercant to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the commercant, or with status 404 (Not Found)
     */
    @GetMapping("/commercants/{id}")
    public ResponseEntity<Commercant> getCommercant(@PathVariable Long id) {
        log.debug("REST request to get Commercant : {}", id);
        Optional<Commercant> commercant = commercantService.findOne(id);
        return ResponseUtil.wrapOrNotFound(commercant);
    }

    /**
     * DELETE  /commercants/:id : delete the "id" commercant.
     *
     * @param id the id of the commercant to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/commercants/{id}")
    public ResponseEntity<Void> deleteCommercant(@PathVariable Long id) {
        log.debug("REST request to delete Commercant : {}", id);
        commercantService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
