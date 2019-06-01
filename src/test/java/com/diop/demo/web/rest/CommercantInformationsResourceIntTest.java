package com.diop.demo.web.rest;

import com.diop.demo.JhipsterApp;

import com.diop.demo.domain.CommercantInformations;
import com.diop.demo.repository.CommercantInformationsRepository;
import com.diop.demo.service.CommercantInformationsService;
import com.diop.demo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.diop.demo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the CommercantInformationsResource REST controller.
 *
 * @see CommercantInformationsResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class CommercantInformationsResourceIntTest {

    private static final String DEFAULT_CLE = "AAAAAAAAAA";
    private static final String UPDATED_CLE = "BBBBBBBBBB";

    private static final String DEFAULT_VALEUR = "AAAAAAAAAA";
    private static final String UPDATED_VALEUR = "BBBBBBBBBB";

    @Autowired
    private CommercantInformationsRepository commercantInformationsRepository;

    @Autowired
    private CommercantInformationsService commercantInformationsService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCommercantInformationsMockMvc;

    private CommercantInformations commercantInformations;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CommercantInformationsResource commercantInformationsResource = new CommercantInformationsResource(commercantInformationsService);
        this.restCommercantInformationsMockMvc = MockMvcBuilders.standaloneSetup(commercantInformationsResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommercantInformations createEntity(EntityManager em) {
        CommercantInformations commercantInformations = new CommercantInformations()
            .cle(DEFAULT_CLE)
            .valeur(DEFAULT_VALEUR);
        return commercantInformations;
    }

    @Before
    public void initTest() {
        commercantInformations = createEntity(em);
    }

    @Test
    @Transactional
    public void createCommercantInformations() throws Exception {
        int databaseSizeBeforeCreate = commercantInformationsRepository.findAll().size();

        // Create the CommercantInformations
        restCommercantInformationsMockMvc.perform(post("/api/commercant-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commercantInformations)))
            .andExpect(status().isCreated());

        // Validate the CommercantInformations in the database
        List<CommercantInformations> commercantInformationsList = commercantInformationsRepository.findAll();
        assertThat(commercantInformationsList).hasSize(databaseSizeBeforeCreate + 1);
        CommercantInformations testCommercantInformations = commercantInformationsList.get(commercantInformationsList.size() - 1);
        assertThat(testCommercantInformations.getCle()).isEqualTo(DEFAULT_CLE);
        assertThat(testCommercantInformations.getValeur()).isEqualTo(DEFAULT_VALEUR);
    }

    @Test
    @Transactional
    public void createCommercantInformationsWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = commercantInformationsRepository.findAll().size();

        // Create the CommercantInformations with an existing ID
        commercantInformations.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommercantInformationsMockMvc.perform(post("/api/commercant-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commercantInformations)))
            .andExpect(status().isBadRequest());

        // Validate the CommercantInformations in the database
        List<CommercantInformations> commercantInformationsList = commercantInformationsRepository.findAll();
        assertThat(commercantInformationsList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllCommercantInformations() throws Exception {
        // Initialize the database
        commercantInformationsRepository.saveAndFlush(commercantInformations);

        // Get all the commercantInformationsList
        restCommercantInformationsMockMvc.perform(get("/api/commercant-informations?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commercantInformations.getId().intValue())))
            .andExpect(jsonPath("$.[*].cle").value(hasItem(DEFAULT_CLE.toString())))
            .andExpect(jsonPath("$.[*].valeur").value(hasItem(DEFAULT_VALEUR.toString())));
    }
    
    @Test
    @Transactional
    public void getCommercantInformations() throws Exception {
        // Initialize the database
        commercantInformationsRepository.saveAndFlush(commercantInformations);

        // Get the commercantInformations
        restCommercantInformationsMockMvc.perform(get("/api/commercant-informations/{id}", commercantInformations.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(commercantInformations.getId().intValue()))
            .andExpect(jsonPath("$.cle").value(DEFAULT_CLE.toString()))
            .andExpect(jsonPath("$.valeur").value(DEFAULT_VALEUR.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCommercantInformations() throws Exception {
        // Get the commercantInformations
        restCommercantInformationsMockMvc.perform(get("/api/commercant-informations/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCommercantInformations() throws Exception {
        // Initialize the database
        commercantInformationsService.save(commercantInformations);

        int databaseSizeBeforeUpdate = commercantInformationsRepository.findAll().size();

        // Update the commercantInformations
        CommercantInformations updatedCommercantInformations = commercantInformationsRepository.findById(commercantInformations.getId()).get();
        // Disconnect from session so that the updates on updatedCommercantInformations are not directly saved in db
        em.detach(updatedCommercantInformations);
        updatedCommercantInformations
            .cle(UPDATED_CLE)
            .valeur(UPDATED_VALEUR);

        restCommercantInformationsMockMvc.perform(put("/api/commercant-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCommercantInformations)))
            .andExpect(status().isOk());

        // Validate the CommercantInformations in the database
        List<CommercantInformations> commercantInformationsList = commercantInformationsRepository.findAll();
        assertThat(commercantInformationsList).hasSize(databaseSizeBeforeUpdate);
        CommercantInformations testCommercantInformations = commercantInformationsList.get(commercantInformationsList.size() - 1);
        assertThat(testCommercantInformations.getCle()).isEqualTo(UPDATED_CLE);
        assertThat(testCommercantInformations.getValeur()).isEqualTo(UPDATED_VALEUR);
    }

    @Test
    @Transactional
    public void updateNonExistingCommercantInformations() throws Exception {
        int databaseSizeBeforeUpdate = commercantInformationsRepository.findAll().size();

        // Create the CommercantInformations

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommercantInformationsMockMvc.perform(put("/api/commercant-informations")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(commercantInformations)))
            .andExpect(status().isBadRequest());

        // Validate the CommercantInformations in the database
        List<CommercantInformations> commercantInformationsList = commercantInformationsRepository.findAll();
        assertThat(commercantInformationsList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCommercantInformations() throws Exception {
        // Initialize the database
        commercantInformationsService.save(commercantInformations);

        int databaseSizeBeforeDelete = commercantInformationsRepository.findAll().size();

        // Delete the commercantInformations
        restCommercantInformationsMockMvc.perform(delete("/api/commercant-informations/{id}", commercantInformations.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<CommercantInformations> commercantInformationsList = commercantInformationsRepository.findAll();
        assertThat(commercantInformationsList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommercantInformations.class);
        CommercantInformations commercantInformations1 = new CommercantInformations();
        commercantInformations1.setId(1L);
        CommercantInformations commercantInformations2 = new CommercantInformations();
        commercantInformations2.setId(commercantInformations1.getId());
        assertThat(commercantInformations1).isEqualTo(commercantInformations2);
        commercantInformations2.setId(2L);
        assertThat(commercantInformations1).isNotEqualTo(commercantInformations2);
        commercantInformations1.setId(null);
        assertThat(commercantInformations1).isNotEqualTo(commercantInformations2);
    }
}
