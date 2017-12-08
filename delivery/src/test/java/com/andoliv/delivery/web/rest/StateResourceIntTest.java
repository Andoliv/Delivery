package com.andoliv.delivery.web.rest;

import com.andoliv.delivery.DeliveryApp;
import com.andoliv.delivery.domain.State;
import com.andoliv.delivery.repository.StateRepository;
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
 * Test class for the StateResource REST controller.
 *
 * @see StateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = DeliveryApp.class)
public class StateResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_SYMBOL = "AAAAAAAAAA";
    private static final String UPDATED_SYMBOL = "BBBBBBBBBB";

    @Autowired
    private StateRepository stateRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restStateMockMvc;

    private State state;

    /**
     * Create an entity for this test.
     * <p>
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static State createEntity(EntityManager em) {
        State state = new State()
            .name(DEFAULT_NAME)
            .symbol(DEFAULT_SYMBOL);
        return state;
    }

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final StateResource stateResource = new StateResource(stateRepository);
        this.restStateMockMvc = MockMvcBuilders.standaloneSetup(stateResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    @Before
    public void initTest() {
        state = createEntity(em);
    }

    @Test
    @Transactional
    public void createState() throws Exception {
        int databaseSizeBeforeCreate = stateRepository.findAll().size();

        // Create the State
        restStateMockMvc.perform(post("/api/states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(state)))
            .andExpect(status().isCreated());

        // Validate the State in the database
        List<State> stateList = stateRepository.findAll();
        assertThat(stateList).hasSize(databaseSizeBeforeCreate + 1);
        State testState = stateList.get(stateList.size() - 1);
        assertThat(testState.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testState.getSymbol()).isEqualTo(DEFAULT_SYMBOL);
    }

    @Test
    @Transactional
    public void createStateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = stateRepository.findAll().size();

        // Create the State with an existing ID
        state.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restStateMockMvc.perform(post("/api/states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(state)))
            .andExpect(status().isBadRequest());

        // Validate the State in the database
        List<State> stateList = stateRepository.findAll();
        assertThat(stateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = stateRepository.findAll().size();
        // set the field null
        state.setName(null);

        // Create the State, which fails.

        restStateMockMvc.perform(post("/api/states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(state)))
            .andExpect(status().isBadRequest());

        List<State> stateList = stateRepository.findAll();
        assertThat(stateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkSymbolIsRequired() throws Exception {
        int databaseSizeBeforeTest = stateRepository.findAll().size();
        // set the field null
        state.setSymbol(null);

        // Create the State, which fails.

        restStateMockMvc.perform(post("/api/states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(state)))
            .andExpect(status().isBadRequest());

        List<State> stateList = stateRepository.findAll();
        assertThat(stateList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllStates() throws Exception {
        // Initialize the database
        stateRepository.saveAndFlush(state);

        // Get all the stateList
        restStateMockMvc.perform(get("/api/states?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(state.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].symbol").value(hasItem(DEFAULT_SYMBOL.toString())));
    }

    @Test
    @Transactional
    public void getState() throws Exception {
        // Initialize the database
        stateRepository.saveAndFlush(state);

        // Get the state
        restStateMockMvc.perform(get("/api/states/{id}", state.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(state.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.symbol").value(DEFAULT_SYMBOL.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingState() throws Exception {
        // Get the state
        restStateMockMvc.perform(get("/api/states/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateState() throws Exception {
        // Initialize the database
        stateRepository.saveAndFlush(state);
        int databaseSizeBeforeUpdate = stateRepository.findAll().size();

        // Update the state
        State updatedState = stateRepository.findOne(state.getId());
        updatedState
            .name(UPDATED_NAME)
            .symbol(UPDATED_SYMBOL);

        restStateMockMvc.perform(put("/api/states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedState)))
            .andExpect(status().isOk());

        // Validate the State in the database
        List<State> stateList = stateRepository.findAll();
        assertThat(stateList).hasSize(databaseSizeBeforeUpdate);
        State testState = stateList.get(stateList.size() - 1);
        assertThat(testState.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testState.getSymbol()).isEqualTo(UPDATED_SYMBOL);
    }

    @Test
    @Transactional
    public void updateNonExistingState() throws Exception {
        int databaseSizeBeforeUpdate = stateRepository.findAll().size();

        // Create the State

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restStateMockMvc.perform(put("/api/states")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(state)))
            .andExpect(status().isCreated());

        // Validate the State in the database
        List<State> stateList = stateRepository.findAll();
        assertThat(stateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteState() throws Exception {
        // Initialize the database
        stateRepository.saveAndFlush(state);
        int databaseSizeBeforeDelete = stateRepository.findAll().size();

        // Get the state
        restStateMockMvc.perform(delete("/api/states/{id}", state.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<State> stateList = stateRepository.findAll();
        assertThat(stateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(State.class);
        State state1 = new State();
        state1.setId(1L);
        State state2 = new State();
        state2.setId(state1.getId());
        assertThat(state1).isEqualTo(state2);
        state2.setId(2L);
        assertThat(state1).isNotEqualTo(state2);
        state1.setId(null);
        assertThat(state1).isNotEqualTo(state2);
    }
}
