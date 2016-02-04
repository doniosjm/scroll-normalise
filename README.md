# scroll-normalise
Normalise scroll events from devices that have built in inertia scrolling.

## Example

```js
var sh = ScrollHandler({
	onOriginalEvent: function (e) {
		// original event
	},
	onScroll: function (e, direction) {
		// do something with direction which is -1 or 1
	}
});

window.addEventListener('mousewheel', sh, false);
window.addEventListener('DOMMouseScroll', sh, false);
```

## `var sh = ScrollHandler(options)`

```js
{
	onOriginalEvent: Function?
	onScroll: Function?
}
```

## Options

### `options.onOriginalEvent`

If specified this will be called when any scroll event is fired by the browser. The original event will be proxied to this callback.

### `options.onScroll`

If specified this will be called when it is determined a single "scroll" action has happened taking inertia hardware scrolling into consideration. The original event will be proxied to this callback as well as a Boolean that is -1 or 1 for the direction of the scroll.

## MIT Licenced