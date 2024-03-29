---
marp: true
theme: dark
---

![bg right 80](https://res.cloudinary.com/drxgh9gqs/image/upload/v1684337962/image_sqqlof.png)

# Talk to LLM

Theo Sun
2023

---

## Q1: Do you think ChatGPT or other `GPT` (Generative Pre-trained Transformer) / `LLM` (Large Language Model) products already **powerful** enough ?

---

## Q2: Do you want to learn more technical details about LLM ?

---

## Q3: Do you want to `empower` yourself/your product with GPT/LLM ?

---

## Agenda

- Parameters of LLM
- Integration Approaches
  - forward translation
  - text as everything
  - agent
- PoCs
  - SQL translation
  - text to 

![bg right](https://res.cloudinary.com/drxgh9gqs/image/upload/v1684338315/image_1_ycazb3.png)


---

## Parameters of LLM

![bg left](https://res.cloudinary.com/drxgh9gqs/image/upload/v1684339979/image_3_zgulbr.png)

---

### Parameters - `Temperature` - Randomness

---


![](https://res.cloudinary.com/digf90pwi/video/upload/v1684387358/2023-05-18_13-11-50_zx3f51.mp4)

---
### Parameters - `Maximum Length` - Restrict Output

> Avoid unnecessary token/network consumption 

---

![bg 95%](https://res.cloudinary.com/digf90pwi/image/upload/c_scale,h_1389,q_54/v1684389291/2023-05-18_13-53-53_wo0pek.png)

---

### Parameters - Top P

---

## Integration Approaches

![bg right](https://res.cloudinary.com/drxgh9gqs/image/upload/v1684339732/image_2_ak4wt9.png)

---

### Forward Translation

> `Translate` human text to programming language


```d2
shape: sequence_diagram
user -> app: Whats my latest schedules ?
app -> LLM: current user is xxxx@xx.xx, \ntable1 (c1, c2, ....), table2 (c4, c5...) ..., \nuser question is xxxx\nplease output with JSON format, example: \{sql:xxxx,params:\[xxxx\]\}
LLM -> app: \{sql:cccccc,params:\[ppppp\]\}
app -> app: db.query(ccccc, ...ppppp)
app -> user: UI Table
```

---

### Forward Translation

> `Translate` human text to programming language


```d2
shape: sequence_diagram
user -> app: Whats my latest schedules ?
app -> LLM: current user is xxxx@xx.xx, \ntable1 (c1, c2, ....), table2 (c4, c5...) ..., \nuser question is xxxx\nplease output with JSON format, example: \{sql:xxxx,params:\[xxxx\]\}
LLM -> app: \{sql:cccccc,params:\[ppppp\]\}
app -> app: db.query(ccccc, ...ppppp)
app -> LLM: convert table <data> to pie charts with echarts config,\nexample: \{title ... legend...\}
LLM -> app: \{title xxx legend www\}
app -> user: UI Chart
```

---

## Text as Everything



```d2
shape: sequence_diagram
user -> app: Whats my latest schedules ?
app -> LLM: current user is xxxx@xx.xx, \ntable1 (c1, c2, ....), table2 (c4, c5...) ..., \nuser question is xxxx\nplease output with JSON format, example: \{sql:xxxx,params:\[xxxx\]\}
LLM -> app: \{sql:cccccc,params:\[ppppp\]\}
app -> app: db.query(ccccc, ...ppppp)
app -> LLM: convert table <data> to pie charts with echarts config,\nexample: \{title ... legend...\}
LLM -> app: \{title xxx legend www\}
app -> user: UI Chart
```



---

## Agent

![bg left](https://res.cloudinary.com/drxgh9gqs/image/upload/v1684340254/image_4_tqgdfg.png)

---

## Reference  

- [DeepFloyd IF](https://huggingface.co/spaces/DeepFloyd/IF)