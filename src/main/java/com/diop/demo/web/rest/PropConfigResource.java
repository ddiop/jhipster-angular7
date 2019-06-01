package com.diop.demo.web.rest;
import com.diop.demo.domain.PropConfig;
import com.diop.demo.service.PropConfigService;
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
 * REST controller for managing PropConfig.
 */
@RestController
@RequestMapping("/api")
public class PropConfigResource {

    private final Logger log = LoggerFactory.getLogger(PropConfigResource.class);

    private static final String ENTITY_NAME = "propConfig";

    private final PropConfigService propConfigService;

    public PropConfigResource(PropConfigService propConfigService) {
        this.propConfigService = propConfigService;
    }

    /**
     * POST  /prop-configs : Create a new propConfig.
     *
     * @param propConfig the propConfig to create
     * @return the ResponseEntity with status 201 (Created) and with body the new propConfig, or with status 400 (Bad Request) if the propConfig has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/prop-configs")
    public ResponseEntity<PropConfig> createPropConfig(@Valid @RequestBody PropConfig propConfig) throws URISyntaxException {
        log.debug("REST request to save PropConfig : {}", propConfig);
        if (propConfig.getId() != null) {
            throw new BadRequestAlertException("A new propConfig cannot already have an ID", ENTITY_NAME, "idexists");
        }
        PropConfig result = propConfigService.save(propConfig);
        return ResponseEntity.created(new URI("/api/prop-configs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /prop-configs : Updates an existing propConfig.
     *
     * @param propConfig the propConfig to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated propConfig,
     * or with status 400 (Bad Request) if the propConfig is not valid,
     * or with status 500 (Internal Server Error) if the propConfig couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/prop-configs")
    public ResponseEntity<PropConfig> updatePropConfig(@Valid @RequestBody PropConfig propConfig) throws URISyntaxException {
        log.debug("REST request to update PropConfig : {}", propConfig);
        if (propConfig.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        PropConfig result = propConfigService.save(propConfig);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, propConfig.getId().toString()))
            .body(result);
    }

    /**
     * GET  /prop-configs : get all the propConfigs.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of propConfigs in body
     */
    @GetMapping("/prop-configs")
    public ResponseEntity<List<PropConfig>> getAllPropConfigs(Pageable pageable) {
        log.debug("REST request to get a page of PropConfigs");
        Page<PropConfig> page = propConfigService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/prop-configs");
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * GET  /prop-configs/:id : get the "id" propConfig.
     *
     * @param id the id of the propConfig to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the propConfig, or with status 404 (Not Found)
     */
    @GetMapping("/prop-configs/{id}")
    public ResponseEntity<PropConfig> getPropConfig(@PathVariable Long id) {
        log.debug("REST request to get PropConfig : {}", id);
        Optional<PropConfig> propConfig = propConfigService.findOne(id);
        return ResponseUtil.wrapOrNotFound(propConfig);
    }

    /**
     * DELETE  /prop-configs/:id : delete the "id" propConfig.
     *
     * @param id the id of the propConfig to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/prop-configs/{id}")
    public ResponseEntity<Void> deletePropConfig(@PathVariable Long id) {
        log.debug("REST request to delete PropConfig : {}", id);
        propConfigService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
