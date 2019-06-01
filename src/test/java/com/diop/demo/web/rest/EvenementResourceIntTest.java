package com.diop.demo.web.rest;

import com.diop.demo.JhipsterApp;

import com.diop.demo.domain.Evenement;
import com.diop.demo.repository.EvenementRepository;
import com.diop.demo.service.EvenementService;
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
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;


import static com.diop.demo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the EvenementResource REST controller.
 *
 * @see EvenementResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class EvenementResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_DETAIL = "AAAAAAAAAA";
    private static final String UPDATED_DETAIL = "BBBBBBBBBB";

    private static final String DEFAULT_LIEU_DEPART = "AAAAAAAAAA";
    private static final String UPDATED_LIEU_DEPART = "BBBBBBBBBB";

    private static final String DEFAULT_LIEU_DESTINATION = "AAAAAAAAAA";
    private static final String UPDATED_LIEU_DESTINATION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_DEPART = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_DEPART = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_RETOUR = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_RETOUR = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_REFLEXION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_REFLEXION = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_DATE_CREATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_CREATION = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private EvenementRepository evenementRepository;

    @Autowired
    private EvenementService evenementService;

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

    private MockMvc restEvenementMockMvc;

    private Evenement evenement;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final EvenementResource evenementResource = new EvenementResource(evenementService);
        this.restEvenementMockMvc = MockMvcBuilders.standaloneSetup(evenementResource)
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
    public static Evenement createEntity(EntityManager em) {
        Evenement evenement = new Evenement()
            .nom(DEFAULT_NOM)
            .detail(DEFAULT_DETAIL)
            .lieuDepart(DEFAULT_LIEU_DEPART)
            .lieuDestination(DEFAULT_LIEU_DESTINATION)
            .dateDepart(DEFAULT_DATE_DEPART)
            .dateRetour(DEFAULT_DATE_RETOUR)
            .dateReflexion(DEFAULT_DATE_REFLEXION)
            .dateCreation(DEFAULT_DATE_CREATION);
        return evenement;
    }

    @Before
    public void initTest() {
        evenement = createEntity(em);
    }

    @Test
    @Transactional
    public void createEvenement() throws Exception {
        int databaseSizeBeforeCreate = evenementRepository.findAll().size();

        // Create the Evenement
        restEvenementMockMvc.perform(post("/api/evenements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evenement)))
            .andExpect(status().isCreated());

        // Validate the Evenement in the database
        List<Evenement> evenementList = evenementRepository.findAll();
        assertThat(evenementList).hasSize(databaseSizeBeforeCreate + 1);
        Evenement testEvenement = evenementList.get(evenementList.size() - 1);
        assertThat(testEvenement.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testEvenement.getDetail()).isEqualTo(DEFAULT_DETAIL);
        assertThat(testEvenement.getLieuDepart()).isEqualTo(DEFAULT_LIEU_DEPART);
        assertThat(testEvenement.getLieuDestination()).isEqualTo(DEFAULT_LIEU_DESTINATION);
        assertThat(testEvenement.getDateDepart()).isEqualTo(DEFAULT_DATE_DEPART);
        assertThat(testEvenement.getDateRetour()).isEqualTo(DEFAULT_DATE_RETOUR);
        assertThat(testEvenement.getDateReflexion()).isEqualTo(DEFAULT_DATE_REFLEXION);
        assertThat(testEvenement.getDateCreation()).isEqualTo(DEFAULT_DATE_CREATION);
    }

    @Test
    @Transactional
    public void createEvenementWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = evenementRepository.findAll().size();

        // Create the Evenement with an existing ID
        evenement.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEvenementMockMvc.perform(post("/api/evenements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evenement)))
            .andExpect(status().isBadRequest());

        // Validate the Evenement in the database
        List<Evenement> evenementList = evenementRepository.findAll();
        assertThat(evenementList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = evenementRepository.findAll().size();
        // set the field null
        evenement.setNom(null);

        // Create the Evenement, which fails.

        restEvenementMockMvc.perform(post("/api/evenements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evenement)))
            .andExpect(status().isBadRequest());

        List<Evenement> evenementList = evenementRepository.findAll();
        assertThat(evenementList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllEvenements() throws Exception {
        // Initialize the database
        evenementRepository.saveAndFlush(evenement);

        // Get all the evenementList
        restEvenementMockMvc.perform(get("/api/evenements?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(evenement.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].detail").value(hasItem(DEFAULT_DETAIL.toString())))
            .andExpect(jsonPath("$.[*].lieuDepart").value(hasItem(DEFAULT_LIEU_DEPART.toString())))
            .andExpect(jsonPath("$.[*].lieuDestination").value(hasItem(DEFAULT_LIEU_DESTINATION.toString())))
            .andExpect(jsonPath("$.[*].dateDepart").value(hasItem(DEFAULT_DATE_DEPART.toString())))
            .andExpect(jsonPath("$.[*].dateRetour").value(hasItem(DEFAULT_DATE_RETOUR.toString())))
            .andExpect(jsonPath("$.[*].dateReflexion").value(hasItem(DEFAULT_DATE_REFLEXION.toString())))
            .andExpect(jsonPath("$.[*].dateCreation").value(hasItem(DEFAULT_DATE_CREATION.toString())));
    }
    
    @Test
    @Transactional
    public void getEvenement() throws Exception {
        // Initialize the database
        evenementRepository.saveAndFlush(evenement);

        // Get the evenement
        restEvenementMockMvc.perform(get("/api/evenements/{id}", evenement.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(evenement.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.detail").value(DEFAULT_DETAIL.toString()))
            .andExpect(jsonPath("$.lieuDepart").value(DEFAULT_LIEU_DEPART.toString()))
            .andExpect(jsonPath("$.lieuDestination").value(DEFAULT_LIEU_DESTINATION.toString()))
            .andExpect(jsonPath("$.dateDepart").value(DEFAULT_DATE_DEPART.toString()))
            .andExpect(jsonPath("$.dateRetour").value(DEFAULT_DATE_RETOUR.toString()))
            .andExpect(jsonPath("$.dateReflexion").value(DEFAULT_DATE_REFLEXION.toString()))
            .andExpect(jsonPath("$.dateCreation").value(DEFAULT_DATE_CREATION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingEvenement() throws Exception {
        // Get the evenement
        restEvenementMockMvc.perform(get("/api/evenements/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEvenement() throws Exception {
        // Initialize the database
        evenementService.save(evenement);

        int databaseSizeBeforeUpdate = evenementRepository.findAll().size();

        // Update the evenement
        Evenement updatedEvenement = evenementRepository.findById(evenement.getId()).get();
        // Disconnect from session so that the updates on updatedEvenement are not directly saved in db
        em.detach(updatedEvenement);
        updatedEvenement
            .nom(UPDATED_NOM)
            .detail(UPDATED_DETAIL)
            .lieuDepart(UPDATED_LIEU_DEPART)
            .lieuDestination(UPDATED_LIEU_DESTINATION)
            .dateDepart(UPDATED_DATE_DEPART)
            .dateRetour(UPDATED_DATE_RETOUR)
            .dateReflexion(UPDATED_DATE_REFLEXION)
            .dateCreation(UPDATED_DATE_CREATION);

        restEvenementMockMvc.perform(put("/api/evenements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedEvenement)))
            .andExpect(status().isOk());

        // Validate the Evenement in the database
        List<Evenement> evenementList = evenementRepository.findAll();
        assertThat(evenementList).hasSize(databaseSizeBeforeUpdate);
        Evenement testEvenement = evenementList.get(evenementList.size() - 1);
        assertThat(testEvenement.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testEvenement.getDetail()).isEqualTo(UPDATED_DETAIL);
        assertThat(testEvenement.getLieuDepart()).isEqualTo(UPDATED_LIEU_DEPART);
        assertThat(testEvenement.getLieuDestination()).isEqualTo(UPDATED_LIEU_DESTINATION);
        assertThat(testEvenement.getDateDepart()).isEqualTo(UPDATED_DATE_DEPART);
        assertThat(testEvenement.getDateRetour()).isEqualTo(UPDATED_DATE_RETOUR);
        assertThat(testEvenement.getDateReflexion()).isEqualTo(UPDATED_DATE_REFLEXION);
        assertThat(testEvenement.getDateCreation()).isEqualTo(UPDATED_DATE_CREATION);
    }

    @Test
    @Transactional
    public void updateNonExistingEvenement() throws Exception {
        int databaseSizeBeforeUpdate = evenementRepository.findAll().size();

        // Create the Evenement

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEvenementMockMvc.perform(put("/api/evenements")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(evenement)))
            .andExpect(status().isBadRequest());

        // Validate the Evenement in the database
        List<Evenement> evenementList = evenementRepository.findAll();
        assertThat(evenementList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEvenement() throws Exception {
        // Initialize the database
        evenementService.save(evenement);

        int databaseSizeBeforeDelete = evenementRepository.findAll().size();

        // Delete the evenement
        restEvenementMockMvc.perform(delete("/api/evenements/{id}", evenement.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Evenement> evenementList = evenementRepository.findAll();
        assertThat(evenementList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Evenement.class);
        Evenement evenement1 = new Evenement();
        evenement1.setId(1L);
        Evenement evenement2 = new Evenement();
        evenement2.setId(evenement1.getId());
        assertThat(evenement1).isEqualTo(evenement2);
        evenement2.setId(2L);
        assertThat(evenement1).isNotEqualTo(evenement2);
        evenement1.setId(null);
        assertThat(evenement1).isNotEqualTo(evenement2);
    }
}
