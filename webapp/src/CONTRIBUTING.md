- Define a layout Item with a props containing the specific data with the same name :

Don't do :
```
  <FooItem {...foo}/> or <FooItem item={foo}
```

but

```
  <FooItem foo={foo} />
```
