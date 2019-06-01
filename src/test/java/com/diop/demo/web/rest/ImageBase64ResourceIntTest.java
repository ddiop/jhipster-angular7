package com.diop.demo.web.rest;

import com.diop.demo.JhipsterApp;

import com.diop.demo.domain.ImageBase64;
import com.diop.demo.repository.ImageBase64Repository;
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
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;


import static com.diop.demo.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ImageBase64Resource REST controller.
 *
 * @see ImageBase64Resource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterApp.class)
public class ImageBase64ResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_CHEMIN = "AAAAAAAAAA";
    private static final String UPDATED_CHEMIN = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private ImageBase64Repository imageBase64Repository;

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

    private MockMvc restImageBase64MockMvc;

    private ImageBase64 imageBase64;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImageBase64Resource imageBase64Resource = new ImageBase64Resource(imageBase64Repository);
        this.restImageBase64MockMvc = MockMvcBuilders.standaloneSetup(imageBase64Resource)
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
    public static ImageBase64 createEntity(EntityManager em) {
        ImageBase64 imageBase64 = new ImageBase64()
            .name(DEFAULT_NAME)
            .chemin(DEFAULT_CHEMIN)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE);
        return imageBase64;
    }

    @Before
    public void initTest() {
        imageBase64 = createEntity(em);
    }

    @Test
    @Transactional
    public void createImageBase64() throws Exception {
        int databaseSizeBeforeCreate = imageBase64Repository.findAll().size();

        // Create the ImageBase64
        restImageBase64MockMvc.perform(post("/api/image-base-64-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imageBase64)))
            .andExpect(status().isCreated());

        // Validate the ImageBase64 in the database
        List<ImageBase64> imageBase64List = imageBase64Repository.findAll();
        assertThat(imageBase64List).hasSize(databaseSizeBeforeCreate + 1);
        ImageBase64 testImageBase64 = imageBase64List.get(imageBase64List.size() - 1);
        assertThat(testImageBase64.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testImageBase64.getChemin()).isEqualTo(DEFAULT_CHEMIN);
        assertThat(testImageBase64.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testImageBase64.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createImageBase64WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imageBase64Repository.findAll().size();

        // Create the ImageBase64 with an existing ID
        imageBase64.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImageBase64MockMvc.perform(post("/api/image-base-64-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imageBase64)))
            .andExpect(status().isBadRequest());

        // Validate the ImageBase64 in the database
        List<ImageBase64> imageBase64List = imageBase64Repository.findAll();
        assertThat(imageBase64List).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllImageBase64S() throws Exception {
        // Initialize the database
        imageBase64Repository.saveAndFlush(imageBase64);

        // Get all the imageBase64List
        restImageBase64MockMvc.perform(get("/api/image-base-64-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(imageBase64.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].chemin").value(hasItem(DEFAULT_CHEMIN.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))));
    }
    
    @Test
    @Transactional
    public void getImageBase64() throws Exception {
        // Initialize the database
        imageBase64Repository.saveAndFlush(imageBase64);

        // Get the imageBase64
        restImageBase64MockMvc.perform(get("/api/image-base-64-s/{id}", imageBase64.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(imageBase64.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.chemin").value(DEFAULT_CHEMIN.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)));
    }

    @Test
    @Transactional
    public void getNonExistingImageBase64() throws Exception {
        // Get the imageBase64
        restImageBase64MockMvc.perform(get("/api/image-base-64-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImageBase64() throws Exception {
        // Initialize the database
        imageBase64Repository.saveAndFlush(imageBase64);

        int databaseSizeBeforeUpdate = imageBase64Repository.findAll().size();

        // Update the imageBase64
        ImageBase64 updatedImageBase64 = imageBase64Repository.findById(imageBase64.getId()).get();
        // Disconnect from session so that the updates on updatedImageBase64 are not directly saved in db
        em.detach(updatedImageBase64);
        updatedImageBase64
            .name(UPDATED_NAME)
            .chemin(UPDATED_CHEMIN)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);

        restImageBase64MockMvc.perform(put("/api/image-base-64-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedImageBase64)))
            .andExpect(status().isOk());

        // Validate the ImageBase64 in the database
        List<ImageBase64> imageBase64List = imageBase64Repository.findAll();
        assertThat(imageBase64List).hasSize(databaseSizeBeforeUpdate);
        ImageBase64 testImageBase64 = imageBase64List.get(imageBase64List.size() - 1);
        assertThat(testImageBase64.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testImageBase64.getChemin()).isEqualTo(UPDATED_CHEMIN);
        assertThat(testImageBase64.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testImageBase64.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingImageBase64() throws Exception {
        int databaseSizeBeforeUpdate = imageBase64Repository.findAll().size();

        // Create the ImageBase64

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImageBase64MockMvc.perform(put("/api/image-base-64-s")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imageBase64)))
            .andExpect(status().isBadRequest());

        // Validate the ImageBase64 in the database
        List<ImageBase64> imageBase64List = imageBase64Repository.findAll();
        assertThat(imageBase64List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImageBase64() throws Exception {
        // Initialize the database
        imageBase64Repository.saveAndFlush(imageBase64);

        int databaseSizeBeforeDelete = imageBase64Repository.findAll().size();

        // Delete the imageBase64
        restImageBase64MockMvc.perform(delete("/api/image-base-64-s/{id}", imageBase64.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<ImageBase64> imageBase64List = imageBase64Repository.findAll();
        assertThat(imageBase64List).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImageBase64.class);
        ImageBase64 imageBase641 = new ImageBase64();
        imageBase641.setId(1L);
        ImageBase64 imageBase642 = new ImageBase64();
        imageBase642.setId(imageBase641.getId());
        assertThat(imageBase641).isEqualTo(imageBase642);
        imageBase642.setId(2L);
        assertThat(imageBase641).isNotEqualTo(imageBase642);
        imageBase641.setId(null);
        assertThat(imageBase641).isNotEqualTo(imageBase642);
    }
}
