package com.diop.demo.web.rest;

import com.diop.demo.JhipsterApp;

import com.diop.demo.domain.Personne;
import com.diop.demo.repository.PersonneRepository;
import com.diop.demo.service.PersonneService;
import com.diop.demo.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
import java.util.ArrayList;
import java.util.List;


import static com.diop.demo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.diop.demo.domain.enumeration.CIVILITE;
import com.diop.demo.domain.enumeration.LANGUAGE;
/**
 * Test class for the PersonneResource REST controller.
 *
 * @see PersonneResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class PersonneResourceIntTest {

    private static final String DEFAULT_SURNOM = "AAAAAAAAAA";
    private static final String UPDATED_SURNOM = "BBBBBBBBBB";

    private static final CIVILITE DEFAULT_CIVILITE = CIVILITE.MR;
    private static final CIVILITE UPDATED_CIVILITE = CIVILITE.MME;

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_MAIL = "AAAAAAAAAA";
    private static final String UPDATED_MAIL = "BBBBBBBBBB";

    private static final String DEFAULT_PASSWORD = "AAAAAAAAAA";
    private static final String UPDATED_PASSWORD = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DATE_NAISSANCE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATE_NAISSANCE = LocalDate.now(ZoneId.systemDefault());

    private static final Integer DEFAULT_CGU_VERSION = 1;
    private static final Integer UPDATED_CGU_VERSION = 2;

    private static final Boolean DEFAULT_CGU_VALIDE = false;
    private static final Boolean UPDATED_CGU_VALIDE = true;

    private static final LocalDate DEFAULT_CGU_DATE_VALIDATION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_CGU_DATE_VALIDATION = LocalDate.now(ZoneId.systemDefault());

    private static final LANGUAGE DEFAULT_LANGUE = LANGUAGE.FR;
    private static final LANGUAGE UPDATED_LANGUE = LANGUAGE.EN;

    @Autowired
    private PersonneRepository personneRepository;

    @Mock
    private PersonneRepository personneRepositoryMock;

    @Mock
    private PersonneService personneServiceMock;

    @Autowired
    private PersonneService personneService;

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

    private MockMvc restPersonneMockMvc;

    private Personne personne;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PersonneResource personneResource = new PersonneResource(personneService);
        this.restPersonneMockMvc = MockMvcBuilders.standaloneSetup(personneResource)
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
    public static Personne createEntity(EntityManager em) {
        Personne personne = new Personne()
            .surnom(DEFAULT_SURNOM)
            .civilite(DEFAULT_CIVILITE)
            .prenom(DEFAULT_PRENOM)
            .nom(DEFAULT_NOM)
            .mail(DEFAULT_MAIL)
            .password(DEFAULT_PASSWORD)
            .dateNaissance(DEFAULT_DATE_NAISSANCE)
            .cguVersion(DEFAULT_CGU_VERSION)
            .cguValide(DEFAULT_CGU_VALIDE)
            .cguDateValidation(DEFAULT_CGU_DATE_VALIDATION)
            .langue(DEFAULT_LANGUE);
        return personne;
    }

    @Before
    public void initTest() {
        personne = createEntity(em);
    }

    @Test
    @Transactional
    public void createPersonne() throws Exception {
        int databaseSizeBeforeCreate = personneRepository.findAll().size();

        // Create the Personne
        restPersonneMockMvc.perform(post("/api/personnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personne)))
            .andExpect(status().isCreated());

        // Validate the Personne in the database
        List<Personne> personneList = personneRepository.findAll();
        assertThat(personneList).hasSize(databaseSizeBeforeCreate + 1);
        Personne testPersonne = personneList.get(personneList.size() - 1);
        assertThat(testPersonne.getSurnom()).isEqualTo(DEFAULT_SURNOM);
        assertThat(testPersonne.getCivilite()).isEqualTo(DEFAULT_CIVILITE);
        assertThat(testPersonne.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testPersonne.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testPersonne.getMail()).isEqualTo(DEFAULT_MAIL);
        assertThat(testPersonne.getPassword()).isEqualTo(DEFAULT_PASSWORD);
        assertThat(testPersonne.getDateNaissance()).isEqualTo(DEFAULT_DATE_NAISSANCE);
        assertThat(testPersonne.getCguVersion()).isEqualTo(DEFAULT_CGU_VERSION);
        assertThat(testPersonne.isCguValide()).isEqualTo(DEFAULT_CGU_VALIDE);
        assertThat(testPersonne.getCguDateValidation()).isEqualTo(DEFAULT_CGU_DATE_VALIDATION);
        assertThat(testPersonne.getLangue()).isEqualTo(DEFAULT_LANGUE);
    }

    @Test
    @Transactional
    public void createPersonneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = personneRepository.findAll().size();

        // Create the Personne with an existing ID
        personne.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPersonneMockMvc.perform(post("/api/personnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personne)))
            .andExpect(status().isBadRequest());

        // Validate the Personne in the database
        List<Personne> personneList = personneRepository.findAll();
        assertThat(personneList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkSurnomIsRequired() throws Exception {
        int databaseSizeBeforeTest = personneRepository.findAll().size();
        // set the field null
        personne.setSurnom(null);

        // Create the Personne, which fails.

        restPersonneMockMvc.perform(post("/api/personnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personne)))
            .andExpect(status().isBadRequest());

        List<Personne> personneList = personneRepository.findAll();
        assertThat(personneList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPersonnes() throws Exception {
        // Initialize the database
        personneRepository.saveAndFlush(personne);

        // Get all the personneList
        restPersonneMockMvc.perform(get("/api/personnes?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(personne.getId().intValue())))
            .andExpect(jsonPath("$.[*].surnom").value(hasItem(DEFAULT_SURNOM.toString())))
            .andExpect(jsonPath("$.[*].civilite").value(hasItem(DEFAULT_CIVILITE.toString())))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM.toString())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].mail").value(hasItem(DEFAULT_MAIL.toString())))
            .andExpect(jsonPath("$.[*].password").value(hasItem(DEFAULT_PASSWORD.toString())))
            .andExpect(jsonPath("$.[*].dateNaissance").value(hasItem(DEFAULT_DATE_NAISSANCE.toString())))
            .andExpect(jsonPath("$.[*].cguVersion").value(hasItem(DEFAULT_CGU_VERSION)))
            .andExpect(jsonPath("$.[*].cguValide").value(hasItem(DEFAULT_CGU_VALIDE.booleanValue())))
            .andExpect(jsonPath("$.[*].cguDateValidation").value(hasItem(DEFAULT_CGU_DATE_VALIDATION.toString())))
            .andExpect(jsonPath("$.[*].langue").value(hasItem(DEFAULT_LANGUE.toString())));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllPersonnesWithEagerRelationshipsIsEnabled() throws Exception {
        PersonneResource personneResource = new PersonneResource(personneServiceMock);
        when(personneServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        MockMvc restPersonneMockMvc = MockMvcBuilders.standaloneSetup(personneResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPersonneMockMvc.perform(get("/api/personnes?eagerload=true"))
        .andExpect(status().isOk());

        verify(personneServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllPersonnesWithEagerRelationshipsIsNotEnabled() throws Exception {
        PersonneResource personneResource = new PersonneResource(personneServiceMock);
            when(personneServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));
            MockMvc restPersonneMockMvc = MockMvcBuilders.standaloneSetup(personneResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();

        restPersonneMockMvc.perform(get("/api/personnes?eagerload=true"))
        .andExpect(status().isOk());

            verify(personneServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getPersonne() throws Exception {
        // Initialize the database
        personneRepository.saveAndFlush(personne);

        // Get the personne
        restPersonneMockMvc.perform(get("/api/personnes/{id}", personne.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(personne.getId().intValue()))
            .andExpect(jsonPath("$.surnom").value(DEFAULT_SURNOM.toString()))
            .andExpect(jsonPath("$.civilite").value(DEFAULT_CIVILITE.toString()))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM.toString()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.mail").value(DEFAULT_MAIL.toString()))
            .andExpect(jsonPath("$.password").value(DEFAULT_PASSWORD.toString()))
            .andExpect(jsonPath("$.dateNaissance").value(DEFAULT_DATE_NAISSANCE.toString()))
            .andExpect(jsonPath("$.cguVersion").value(DEFAULT_CGU_VERSION))
            .andExpect(jsonPath("$.cguValide").value(DEFAULT_CGU_VALIDE.booleanValue()))
            .andExpect(jsonPath("$.cguDateValidation").value(DEFAULT_CGU_DATE_VALIDATION.toString()))
            .andExpect(jsonPath("$.langue").value(DEFAULT_LANGUE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPersonne() throws Exception {
        // Get the personne
        restPersonneMockMvc.perform(get("/api/personnes/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePersonne() throws Exception {
        // Initialize the database
        personneService.save(personne);

        int databaseSizeBeforeUpdate = personneRepository.findAll().size();

        // Update the personne
        Personne updatedPersonne = personneRepository.findById(personne.getId()).get();
        // Disconnect from session so that the updates on updatedPersonne are not directly saved in db
        em.detach(updatedPersonne);
        updatedPersonne
            .surnom(UPDATED_SURNOM)
            .civilite(UPDATED_CIVILITE)
            .prenom(UPDATED_PRENOM)
            .nom(UPDATED_NOM)
            .mail(UPDATED_MAIL)
            .password(UPDATED_PASSWORD)
            .dateNaissance(UPDATED_DATE_NAISSANCE)
            .cguVersion(UPDATED_CGU_VERSION)
            .cguValide(UPDATED_CGU_VALIDE)
            .cguDateValidation(UPDATED_CGU_DATE_VALIDATION)
            .langue(UPDATED_LANGUE);

        restPersonneMockMvc.perform(put("/api/personnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPersonne)))
            .andExpect(status().isOk());

        // Validate the Personne in the database
        List<Personne> personneList = personneRepository.findAll();
        assertThat(personneList).hasSize(databaseSizeBeforeUpdate);
        Personne testPersonne = personneList.get(personneList.size() - 1);
        assertThat(testPersonne.getSurnom()).isEqualTo(UPDATED_SURNOM);
        assertThat(testPersonne.getCivilite()).isEqualTo(UPDATED_CIVILITE);
        assertThat(testPersonne.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testPersonne.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPersonne.getMail()).isEqualTo(UPDATED_MAIL);
        assertThat(testPersonne.getPassword()).isEqualTo(UPDATED_PASSWORD);
        assertThat(testPersonne.getDateNaissance()).isEqualTo(UPDATED_DATE_NAISSANCE);
        assertThat(testPersonne.getCguVersion()).isEqualTo(UPDATED_CGU_VERSION);
        assertThat(testPersonne.isCguValide()).isEqualTo(UPDATED_CGU_VALIDE);
        assertThat(testPersonne.getCguDateValidation()).isEqualTo(UPDATED_CGU_DATE_VALIDATION);
        assertThat(testPersonne.getLangue()).isEqualTo(UPDATED_LANGUE);
    }

    @Test
    @Transactional
    public void updateNonExistingPersonne() throws Exception {
        int databaseSizeBeforeUpdate = personneRepository.findAll().size();

        // Create the Personne

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPersonneMockMvc.perform(put("/api/personnes")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(personne)))
            .andExpect(status().isBadRequest());

        // Validate the Personne in the database
        List<Personne> personneList = personneRepository.findAll();
        assertThat(personneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePersonne() throws Exception {
        // Initialize the database
        personneService.save(personne);

        int databaseSizeBeforeDelete = personneRepository.findAll().size();

        // Delete the personne
        restPersonneMockMvc.perform(delete("/api/personnes/{id}", personne.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Personne> personneList = personneRepository.findAll();
        assertThat(personneList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Personne.class);
        Personne personne1 = new Personne();
        personne1.setId(1L);
        Personne personne2 = new Personne();
        personne2.setId(personne1.getId());
        assertThat(personne1).isEqualTo(personne2);
        personne2.setId(2L);
        assertThat(personne1).isNotEqualTo(personne2);
        personne1.setId(null);
        assertThat(personne1).isNotEqualTo(personne2);
    }
}
