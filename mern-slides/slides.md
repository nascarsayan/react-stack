---
theme: default
background: https://source.unsplash.com/collection/94734566/1920x1080
class: text-center
highlighter: shikiji
lineNumbers: false
info: |
  ## Slidev Starter Template
  Presentation slides for developers.

  Learn more at [Sli.dev](https://sli.dev)
drawings:
  persist: false
transition: fade-out
title: React Stack
mdc: true
---

# React Stack

Full Stack Web Dev

<div class="pt-12">
  <span @click="$slidev.nav.next" class="px-2 py-1 rounded cursor-pointer" hover="bg-white bg-opacity-10">
    <carbon:arrow-right class="inline"/>
  </span>
</div>


<!--
The last comment block of each slide will be treated as slide notes. It will be visible and editable in Presenter Mode along with the slide. [Read more in the docs](https://sli.dev/guide/syntax.html#notes)
-->

---
transition: fade-out
---

---

# Database Normalization Example

Let's consider a table `Orders`:

| OrderID | Customer | Item           | Address                |
|---------|----------|----------------|------------------------|
| 1       | John     | Laptop, Mouse  | 123 St, City, Country  |
| 2       | Jane     | Keyboard       | 456 St, City, Country  |
| 3       | John     | Monitor        | 123 St, City, Country  |

---

# First Normal Form (1NF)

In 1NF, each table cell should contain a single value, and each record needs to be unique.

| OrderID | Customer | Item     | Address                |
|---------|----------|----------|------------------------|
| 1       | John     | Laptop   | 123 St, City, Country  |
| 1       | John     | Mouse    | 123 St, City, Country  |
| 2       | Jane     | Keyboard | 456 St, City, Country  |
| 3       | John     | Monitor  | 123 St, City, Country  |

---

# Second Normal Form (2NF)

In 2NF, all non-key attributes are fully functional dependent on the primary key.

Table `Orders`:

| OrderID | Customer | Address                |
|---------|----------|------------------------|
| 1       | John     | 123 St, City, Country  |
| 2       | Jane     | 456 St, City, Country  |
| 3       | John     | 123 St, City, Country  |

---

# Second Normal Form (2NF)

Table `OrderItems`:

| OrderID | Item     |
|---------|----------|
| 1       | Laptop   |
| 1       | Mouse    |
| 2       | Keyboard |
| 3       | Monitor  |

---

# Third Normal Form (3NF)

In 3NF, all non-key attributes are dependent on the primary key only and not on other non-key attributes.

Table `Orders`:

| OrderID | CustomerID |
|---------|------------|
| 1       | 1          |
| 2       | 2          |
| 3       | 1          |

---

# Third Normal Form (3NF)

Table `OrderItems`:

| OrderID | Item     |
|---------|----------|
| 1       | Laptop   |
| 1       | Mouse    |
| 2       | Keyboard |
| 3       | Monitor  |

---

# Third Normal Form (3NF)

Table `Customers`:

| CustomerID | Customer | Address                |
|------------|----------|------------------------|
| 1          | John     | 123 St, City, Country  |
| 2          | Jane     | 456 St, City, Country  |

---

# Conclusion

Normalization helps to reduce data redundancy and improve data integrity. However, it's not always the best approach. Sometimes, denormalization can be more beneficial, especially for read-heavy workloads.

---

# Scaling Database
