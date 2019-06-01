package com.diop.demo.web.rest;

import com.diop.demo.JhipsterApp;

import com.diop.demo.domain.PropConfig;
import com.diop.demo.repository.PropConfigRepository;
import com.diop.demo.service.PropConfigService;
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
 * Test class for the PropConfigResource REST controller.
 *
 * @see PropConfigResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class PropConfigResourceIntTest {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_VALEUR = "AAAAAAAAAA";
    private static final String UPDATED_VALEUR = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_VERSION = "BBBBBBBBBB";

    @Autowired
    private PropConfigRepository propConfigRepository;

    @Autowired
    private PropConfigService propConfigService;

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

    private MockMvc restPropConfigMockMvc;

    private PropConfig propConfig;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final PropConfigResource propConfigResource = new PropConfigResource(propConfigService);
        this.restPropConfigMockMvc = MockMvcBuilders.standaloneSetup(propConfigResource)
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
    public static PropConfig createEntity(EntityManager em) {
        PropConfig propConfig = new PropConfig()
            .nom(DEFAULT_NOM)
            .valeur(DEFAULT_VALEUR)
            .description(DEFAULT_DESCRIPTION)
            .version(DEFAULT_VERSION);
        return propConfig;
    }

    @Before
    public void initTest() {
        propConfig = createEntity(em);
    }

    @Test
    @Transactional
    public void createPropConfig() throws Exception {
        int databaseSizeBeforeCreate = propConfigRepository.findAll().size();

        // Create the PropConfig
        restPropConfigMockMvc.perform(post("/api/prop-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propConfig)))
            .andExpect(status().isCreated());

        // Validate the PropConfig in the database
        List<PropConfig> propConfigList = propConfigRepository.findAll();
        assertThat(propConfigList).hasSize(databaseSizeBeforeCreate + 1);
        PropConfig testPropConfig = propConfigList.get(propConfigList.size() - 1);
        assertThat(testPropConfig.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testPropConfig.getValeur()).isEqualTo(DEFAULT_VALEUR);
        assertThat(testPropConfig.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testPropConfig.getVersion()).isEqualTo(DEFAULT_VERSION);
    }

    @Test
    @Transactional
    public void createPropConfigWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = propConfigRepository.findAll().size();

        // Create the PropConfig with an existing ID
        propConfig.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restPropConfigMockMvc.perform(post("/api/prop-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propConfig)))
            .andExpect(status().isBadRequest());

        // Validate the PropConfig in the database
        List<PropConfig> propConfigList = propConfigRepository.findAll();
        assertThat(propConfigList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNomIsRequired() throws Exception {
        int databaseSizeBeforeTest = propConfigRepository.findAll().size();
        // set the field null
        propConfig.setNom(null);

        // Create the PropConfig, which fails.

        restPropConfigMockMvc.perform(post("/api/prop-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propConfig)))
            .andExpect(status().isBadRequest());

        List<PropConfig> propConfigList = propConfigRepository.findAll();
        assertThat(propConfigList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkValeurIsRequired() throws Exception {
        int databaseSizeBeforeTest = propConfigRepository.findAll().size();
        // set the field null
        propConfig.setValeur(null);

        // Create the PropConfig, which fails.

        restPropConfigMockMvc.perform(post("/api/prop-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propConfig)))
            .andExpect(status().isBadRequest());

        List<PropConfig> propConfigList = propConfigRepository.findAll();
        assertThat(propConfigList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllPropConfigs() throws Exception {
        // Initialize the database
        propConfigRepository.saveAndFlush(propConfig);

        // Get all the propConfigList
        restPropConfigMockMvc.perform(get("/api/prop-configs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(propConfig.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM.toString())))
            .andExpect(jsonPath("$.[*].valeur").value(hasItem(DEFAULT_VALEUR.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION.toString())))
            .andExpect(jsonPath("$.[*].version").value(hasItem(DEFAULT_VERSION.toString())));
    }
    
    @Test
    @Transactional
    public void getPropConfig() throws Exception {
        // Initialize the database
        propConfigRepository.saveAndFlush(propConfig);

        // Get the propConfig
        restPropConfigMockMvc.perform(get("/api/prop-configs/{id}", propConfig.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(propConfig.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM.toString()))
            .andExpect(jsonPath("$.valeur").value(DEFAULT_VALEUR.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION.toString()))
            .andExpect(jsonPath("$.version").value(DEFAULT_VERSION.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingPropConfig() throws Exception {
        // Get the propConfig
        restPropConfigMockMvc.perform(get("/api/prop-configs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updatePropConfig() throws Exception {
        // Initialize the database
        propConfigService.save(propConfig);

        int databaseSizeBeforeUpdate = propConfigRepository.findAll().size();

        // Update the propConfig
        PropConfig updatedPropConfig = propConfigRepository.findById(propConfig.getId()).get();
        // Disconnect from session so that the updates on updatedPropConfig are not directly saved in db
        em.detach(updatedPropConfig);
        updatedPropConfig
            .nom(UPDATED_NOM)
            .valeur(UPDATED_VALEUR)
            .description(UPDATED_DESCRIPTION)
            .version(UPDATED_VERSION);

        restPropConfigMockMvc.perform(put("/api/prop-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedPropConfig)))
            .andExpect(status().isOk());

        // Validate the PropConfig in the database
        List<PropConfig> propConfigList = propConfigRepository.findAll();
        assertThat(propConfigList).hasSize(databaseSizeBeforeUpdate);
        PropConfig testPropConfig = propConfigList.get(propConfigList.size() - 1);
        assertThat(testPropConfig.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testPropConfig.getValeur()).isEqualTo(UPDATED_VALEUR);
        assertThat(testPropConfig.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testPropConfig.getVersion()).isEqualTo(UPDATED_VERSION);
    }

    @Test
    @Transactional
    public void updateNonExistingPropConfig() throws Exception {
        int databaseSizeBeforeUpdate = propConfigRepository.findAll().size();

        // Create the PropConfig

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restPropConfigMockMvc.perform(put("/api/prop-configs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(propConfig)))
            .andExpect(status().isBadRequest());

        // Validate the PropConfig in the database
        List<PropConfig> propConfigList = propConfigRepository.findAll();
        assertThat(propConfigList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deletePropConfig() throws Exception {
        // Initialize the database
        propConfigService.save(propConfig);

        int databaseSizeBeforeDelete = propConfigRepository.findAll().size();

        // Delete the propConfig
        restPropConfigMockMvc.perform(delete("/api/prop-configs/{id}", propConfig.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<PropConfig> propConfigList = propConfigRepository.findAll();
        assertThat(propConfigList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(PropConfig.class);
        PropConfig propConfig1 = new PropConfig();
        propConfig1.setId(1L);
        PropConfig propConfig2 = new PropConfig();
        propConfig2.setId(propConfig1.getId());
        assertThat(propConfig1).isEqualTo(propConfig2);
        propConfig2.setId(2L);
        assertThat(propConfig1).isNotEqualTo(propConfig2);
        propConfig1.setId(null);
        assertThat(propConfig1).isNotEqualTo(propConfig2);
    }
}
