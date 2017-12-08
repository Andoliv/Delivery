package com.andoliv.delivery.web.rest;

import com.andoliv.delivery.DeliveryApp;
import com.andoliv.delivery.domain.DeliveryMan;
import com.andoliv.delivery.repository.DeliveryManRepository;
import com.andoliv.delivery.web.rest.errors.ExceptionTranslator;
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

import javax.persistence.EntityManager;
import java.util.List;

import static com.andoliv.delivery.web.rest.TestUtil.createFormattingConversionService;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the DeliveryManResource REST controller.
 *
 * @see DeliveryManResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DeliveryApp.class)
public class DeliveryManResourceIntTest {

    private static final String DEFAULT_SALARY = "AAAAAAAAAA";
    private static final String UPDATED_SALARY = "BBBBBBBBBB";

    @Autowired
    private DeliveryManRepository deliveryManRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restDeliveryManMockMvc;

    private DeliveryMan deliveryMan;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DeliveryMan createEntity(EntityManager em) {
        DeliveryMan deliveryMan = new DeliveryMan()
            .salary(DEFAULT_SALARY);
        return deliveryMan;
    }

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final DeliveryManResource deliveryManResource = new DeliveryManResource(deliveryManRepository);
        this.restDeliveryManMockMvc = MockMvcBuilders.standaloneSetup(deliveryManResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        deliveryMan = createEntity(em);
    }

    @Test
    @Transactional
    public void createDeliveryMan() throws Exception {
        int databaseSizeBeforeCreate = deliveryManRepository.findAll().size();

        // Create the DeliveryMan
        restDeliveryManMockMvc.perform(post("/api/delivery-men")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryMan)))
            .andExpect(status().isCreated());

        // Validate the DeliveryMan in the database
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeCreate + 1);
        DeliveryMan testDeliveryMan = deliveryManList.get(deliveryManList.size() - 1);
        assertThat(testDeliveryMan.getSalary()).isEqualTo(DEFAULT_SALARY);
    }

    @Test
    @Transactional
    public void createDeliveryManWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = deliveryManRepository.findAll().size();

        // Create the DeliveryMan with an existing ID
        deliveryMan.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDeliveryManMockMvc.perform(post("/api/delivery-men")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryMan)))
            .andExpect(status().isBadRequest());

        // Validate the DeliveryMan in the database
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllDeliveryMen() throws Exception {
        // Initialize the database
        deliveryManRepository.saveAndFlush(deliveryMan);

        // Get all the deliveryManList
        restDeliveryManMockMvc.perform(get("/api/delivery-men?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(deliveryMan.getId().intValue())))
            .andExpect(jsonPath("$.[*].salary").value(hasItem(DEFAULT_SALARY.toString())));
    }

    @Test
    @Transactional
    public void getDeliveryMan() throws Exception {
        // Initialize the database
        deliveryManRepository.saveAndFlush(deliveryMan);

        // Get the deliveryMan
        restDeliveryManMockMvc.perform(get("/api/delivery-men/{id}", deliveryMan.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(deliveryMan.getId().intValue()))
            .andExpect(jsonPath("$.salary").value(DEFAULT_SALARY.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingDeliveryMan() throws Exception {
        // Get the deliveryMan
        restDeliveryManMockMvc.perform(get("/api/delivery-men/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDeliveryMan() throws Exception {
        // Initialize the database
        deliveryManRepository.saveAndFlush(deliveryMan);
        int databaseSizeBeforeUpdate = deliveryManRepository.findAll().size();

        // Update the deliveryMan
        DeliveryMan updatedDeliveryMan = deliveryManRepository.findOne(deliveryMan.getId());
        updatedDeliveryMan
            .salary(UPDATED_SALARY);

        restDeliveryManMockMvc.perform(put("/api/delivery-men")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedDeliveryMan)))
            .andExpect(status().isOk());

        // Validate the DeliveryMan in the database
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeUpdate);
        DeliveryMan testDeliveryMan = deliveryManList.get(deliveryManList.size() - 1);
        assertThat(testDeliveryMan.getSalary()).isEqualTo(UPDATED_SALARY);
    }

    @Test
    @Transactional
    public void updateNonExistingDeliveryMan() throws Exception {
        int databaseSizeBeforeUpdate = deliveryManRepository.findAll().size();

        // Create the DeliveryMan

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restDeliveryManMockMvc.perform(put("/api/delivery-men")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(deliveryMan)))
            .andExpect(status().isCreated());

        // Validate the DeliveryMan in the database
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteDeliveryMan() throws Exception {
        // Initialize the database
        deliveryManRepository.saveAndFlush(deliveryMan);
        int databaseSizeBeforeDelete = deliveryManRepository.findAll().size();

        // Get the deliveryMan
        restDeliveryManMockMvc.perform(delete("/api/delivery-men/{id}", deliveryMan.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<DeliveryMan> deliveryManList = deliveryManRepository.findAll();
        assertThat(deliveryManList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DeliveryMan.class);
        DeliveryMan deliveryMan1 = new DeliveryMan();
        deliveryMan1.setId(1L);
        DeliveryMan deliveryMan2 = new DeliveryMan();
        deliveryMan2.setId(deliveryMan1.getId());
        assertThat(deliveryMan1).isEqualTo(deliveryMan2);
        deliveryMan2.setId(2L);
        assertThat(deliveryMan1).isNotEqualTo(deliveryMan2);
        deliveryMan1.setId(null);
        assertThat(deliveryMan1).isNotEqualTo(deliveryMan2);
    }
}
