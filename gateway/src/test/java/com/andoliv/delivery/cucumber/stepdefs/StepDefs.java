package com.andoliv.delivery.cucumber.stepdefs;

import com.andoliv.delivery.DeliveryApp;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

@WebAppConfiguration
@SpringBootTest
@ContextConfiguration(classes = DeliveryApp.class)
public abstract class StepDefs {

    protected ResultActions actions;

}
