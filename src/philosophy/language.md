---
marp: true
theme: dark
---


# Language

![bg right](https://res.cloudinary.com/drxgh9gqs/image/upload/f_auto,q_auto/gizrfifjv2zat3jxxrti)

> What one cannot speak about, one must pass over in silence

Theo Sun
2024

---

Things, Facts, Situations

Language constitutes the schema of the world. There is an isomorphism between language and the world. The logic of the world and language is isomorphic.

A simple fact can be broken down into multiple possible basic situations, thus it is discrete.

There must be fundamental objects in the world that correspond to language.

---

## Wovon man nicht sprechen kann, darüber muss man schweigen

> What one cannot speak about, one must pass over in silence

```js
class Facade {
  // .....
  doStuff() {
    return Promise.all([httpReq1(), httpReq2()])
  }
  doBusinessC() {
    // .....
    // how could us wait doStuff two requests get finished
    // ....
  }
  // .....
}
```

---

## Wovon man nicht sprechen kann, darüber muss man schweigen

> What one cannot speak about, one must pass over in silence

```java
public class Facade {

  private CompletableFuture<String> httpReq1() {
    return CompletableFuture.supplyAsync(() -> {
      return "Response from httpReq1";
    });
  }

  // ... httpReq2()

  public void doBusinessC() {
    // ...
    CompletableFuture.allOf(httpReq1(), httpReq2()).join()
    // ...
  }

}
```

---
