# Reaktor Pre-assignment

My craziest solution to this assignment. A small program to read `status` file.

### [VP Reaktor demo link](https://vuanpham.me/reaktor).

## Assignment

On a Debian and Ubuntu systems, there is a file called /var/lib/dpkg/status that holds information about software packages that the system knows about. Write a small program in a programming language of your choice that exposes some key information about packages in the file via an HTML interface.

### Prerequisites

Change the url in frontend `App.vue` line 40 to `http://localhost:3000/api/packages`.\
To use your own`status`file add the path in backend `index.js` line 9.

### Installing

Install dependencies and run in dev mode.

```
npm install / yarn install
npm run dev / yarn dev
```

## Built With

- [Node.js](https://nodejs.org/en/)
- [Vue.js](https://vuejs.org/)

## Authors

- **Vuan Pham** - [Vunski](https://github.com/vunski)
