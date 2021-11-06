---
theme: default
highlighter: shiki
background: https://res.cloudinary.com/digf90pwi/image/upload/v1636193155/michiel-leunens-0wIHsm2_1fc-unsplash_zjbbju.jpg
---

# Move to Java 17

> We must move forward, even if we love the golden age.

Theo Sun

2021

---

# How about the LTS of java


| Release            | GA Date        | Premier Support Until  | Extended Support Until  | Sustaining Support |
| ------------------ | -------------- | ---------------------- | ----------------------- | ------------------ |
| 7 (LTS)            | July 2011      | July 2019              | July 2022\*\*\*\*\*     | Indefinite         |
| 8 (LTS)\*\*       | March 2014     | March 2022             | December 2030\*\*\*\*\* | Indefinite         |
| 11 (LTS)           | September 2018 | September 2023         | September 2026          | Indefinite         |
| 17 (LTS)           | September 2021 | September 2026\*\*\*\* | September 2029\*\*\*\*  | Indefinite         |
| 21 (LTS)\*\*\*     | September 2023 | September 2028         | September 2031          | Indefinite         |

<br>

- [Oracle Java SE Support Roadmap](https://www.oracle.com/java/technologies/java-se-support-roadmap.html)
- [SAP Machine - Security Updates, Maintenance and Support](https://github.com/SAP/SapMachine/wiki/Security-Updates,-Maintenance-and-Support)
- [What does LTS mean for OpenJDK?](http://mail.openjdk.java.net/pipermail/jdk-dev/2018-August/001833.html)

---

# Notable Features


- Convenience Null Pointer Exception Message
- `Record` Immutable Data Type
- `Collection` and `Stream` API update
- `instance of Type t && t.methodCall()` shorten type guarded
- `var` keyword in method scope
