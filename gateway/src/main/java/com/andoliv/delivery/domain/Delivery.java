package com.andoliv.delivery.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Objects;

/**
 * A Delivery.
 */
@Entity
@Table(name = "delivery")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Delivery implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    @NotNull
    @Column(name = "jhi_value", nullable = false)
    private Long value;

    @Column(name = "expected_distance")
    private Long expectedDistance;

    @Column(name = "travelled_distance")
    private Long travelledDistance;

    @Column(name = "expected_cost")
    private Long expectedCost;

    @Column(name = "total_cost")
    private Long totalCost;

    @Column(name = "delivery_quality")
    private String deliveryQuality;

    @Column(name = "payment_quality")
    private String paymentQuality;

    @Column(name = "expected_time")
    private Long expectedTime;

    @Column(name = "delivery_time")
    private Long deliveryTime;

    @ManyToOne
    private DeliveryMan deliveryMan;

    @ManyToOne
    private Client client;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Delivery title(String title) {
        this.title = title;
        return this;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Delivery description(String description) {
        this.description = description;
        return this;
    }

    public Long getValue() {
        return value;
    }

    public void setValue(Long value) {
        this.value = value;
    }

    public Delivery value(Long value) {
        this.value = value;
        return this;
    }

    public Long getExpectedDistance() {
        return expectedDistance;
    }

    public void setExpectedDistance(Long expectedDistance) {
        this.expectedDistance = expectedDistance;
    }

    public Delivery expectedDistance(Long expectedDistance) {
        this.expectedDistance = expectedDistance;
        return this;
    }

    public Long getTravelledDistance() {
        return travelledDistance;
    }

    public void setTravelledDistance(Long travelledDistance) {
        this.travelledDistance = travelledDistance;
    }

    public Delivery travelledDistance(Long travelledDistance) {
        this.travelledDistance = travelledDistance;
        return this;
    }

    public Long getExpectedCost() {
        return expectedCost;
    }

    public void setExpectedCost(Long expectedCost) {
        this.expectedCost = expectedCost;
    }

    public Delivery expectedCost(Long expectedCost) {
        this.expectedCost = expectedCost;
        return this;
    }

    public Long getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Long totalCost) {
        this.totalCost = totalCost;
    }

    public Delivery totalCost(Long totalCost) {
        this.totalCost = totalCost;
        return this;
    }

    public String getDeliveryQuality() {
        return deliveryQuality;
    }

    public void setDeliveryQuality(String deliveryQuality) {
        this.deliveryQuality = deliveryQuality;
    }

    public Delivery deliveryQuality(String deliveryQuality) {
        this.deliveryQuality = deliveryQuality;
        return this;
    }

    public String getPaymentQuality() {
        return paymentQuality;
    }

    public void setPaymentQuality(String paymentQuality) {
        this.paymentQuality = paymentQuality;
    }

    public Delivery paymentQuality(String paymentQuality) {
        this.paymentQuality = paymentQuality;
        return this;
    }

    public Long getExpectedTime() {
        return expectedTime;
    }

    public void setExpectedTime(Long expectedTime) {
        this.expectedTime = expectedTime;
    }

    public Delivery expectedTime(Long expectedTime) {
        this.expectedTime = expectedTime;
        return this;
    }

    public Long getDeliveryTime() {
        return deliveryTime;
    }

    public void setDeliveryTime(Long deliveryTime) {
        this.deliveryTime = deliveryTime;
    }

    public Delivery deliveryTime(Long deliveryTime) {
        this.deliveryTime = deliveryTime;
        return this;
    }

    public DeliveryMan getDeliveryMan() {
        return deliveryMan;
    }

    public void setDeliveryMan(DeliveryMan deliveryMan) {
        this.deliveryMan = deliveryMan;
    }

    public Delivery deliveryMan(DeliveryMan deliveryMan) {
        this.deliveryMan = deliveryMan;
        return this;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public Delivery client(Client client) {
        this.client = client;
        return this;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Delivery delivery = (Delivery) o;
        if (delivery.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), delivery.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Delivery{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", description='" + getDescription() + "'" +
            ", value='" + getValue() + "'" +
            ", expectedDistance='" + getExpectedDistance() + "'" +
            ", travelledDistance='" + getTravelledDistance() + "'" +
            ", expectedCost='" + getExpectedCost() + "'" +
            ", totalCost='" + getTotalCost() + "'" +
            ", deliveryQuality='" + getDeliveryQuality() + "'" +
            ", paymentQuality='" + getPaymentQuality() + "'" +
            ", expectedTime='" + getExpectedTime() + "'" +
            ", deliveryTime='" + getDeliveryTime() + "'" +
            "}";
    }
}
