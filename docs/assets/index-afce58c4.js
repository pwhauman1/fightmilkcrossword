true&&(function polyfill() {
    const relList = document.createElement('link').relList;
    if (relList && relList.supports && relList.supports('modulepreload')) {
        return;
    }
    for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
        processPreload(link);
    }
    new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type !== 'childList') {
                continue;
            }
            for (const node of mutation.addedNodes) {
                if (node.tagName === 'LINK' && node.rel === 'modulepreload')
                    processPreload(node);
            }
        }
    }).observe(document, { childList: true, subtree: true });
    function getFetchOpts(link) {
        const fetchOpts = {};
        if (link.integrity)
            fetchOpts.integrity = link.integrity;
        if (link.referrerPolicy)
            fetchOpts.referrerPolicy = link.referrerPolicy;
        if (link.crossOrigin === 'use-credentials')
            fetchOpts.credentials = 'include';
        else if (link.crossOrigin === 'anonymous')
            fetchOpts.credentials = 'omit';
        else
            fetchOpts.credentials = 'same-origin';
        return fetchOpts;
    }
    function processPreload(link) {
        if (link.ep)
            // ep marker = processed
            return;
        link.ep = true;
        // prepopulate the load record
        const fetchOpts = getFetchOpts(link);
        fetch(link.href, fetchOpts);
    }
}());

const app = '';

/** @returns {void} */
function noop() {}

/**
 * @template T
 * @template S
 * @param {T} tar
 * @param {S} src
 * @returns {T & S}
 */
function assign(tar, src) {
	// @ts-ignore
	for (const k in src) tar[k] = src[k];
	return /** @type {T & S} */ (tar);
}

// Adapted from https://github.com/then/is-promise/blob/master/index.js
// Distributed under MIT License https://github.com/then/is-promise/blob/master/LICENSE
/**
 * @param {any} value
 * @returns {value is PromiseLike<any>}
 */
function is_promise(value) {
	return (
		!!value &&
		(typeof value === 'object' || typeof value === 'function') &&
		typeof (/** @type {any} */ (value).then) === 'function'
	);
}

function run(fn) {
	return fn();
}

function blank_object() {
	return Object.create(null);
}

/**
 * @param {Function[]} fns
 * @returns {void}
 */
function run_all(fns) {
	fns.forEach(run);
}

/**
 * @param {any} thing
 * @returns {thing is Function}
 */
function is_function(thing) {
	return typeof thing === 'function';
}

/** @returns {boolean} */
function safe_not_equal(a, b) {
	return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
}

/** @returns {boolean} */
function is_empty(obj) {
	return Object.keys(obj).length === 0;
}

/**
 * @param {Node} target
 * @param {Node} node
 * @returns {void}
 */
function append(target, node) {
	target.appendChild(node);
}

/**
 * @param {Node} target
 * @param {Node} node
 * @param {Node} [anchor]
 * @returns {void}
 */
function insert(target, node, anchor) {
	target.insertBefore(node, anchor || null);
}

/**
 * @param {Node} node
 * @returns {void}
 */
function detach(node) {
	if (node.parentNode) {
		node.parentNode.removeChild(node);
	}
}

/**
 * @returns {void} */
function destroy_each(iterations, detaching) {
	for (let i = 0; i < iterations.length; i += 1) {
		if (iterations[i]) iterations[i].d(detaching);
	}
}

/**
 * @template {keyof HTMLElementTagNameMap} K
 * @param {K} name
 * @returns {HTMLElementTagNameMap[K]}
 */
function element(name) {
	return document.createElement(name);
}

/**
 * @param {string} data
 * @returns {Text}
 */
function text$1(data) {
	return document.createTextNode(data);
}

/**
 * @returns {Text} */
function space() {
	return text$1(' ');
}

/**
 * @returns {Text} */
function empty() {
	return text$1('');
}

/**
 * @param {EventTarget} node
 * @param {string} event
 * @param {EventListenerOrEventListenerObject} handler
 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
 * @returns {() => void}
 */
function listen(node, event, handler, options) {
	node.addEventListener(event, handler, options);
	return () => node.removeEventListener(event, handler, options);
}

/**
 * @param {Element} node
 * @param {string} attribute
 * @param {string} [value]
 * @returns {void}
 */
function attr(node, attribute, value) {
	if (value == null) node.removeAttribute(attribute);
	else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}

/**
 * @param {Element} element
 * @returns {ChildNode[]}
 */
function children(element) {
	return Array.from(element.childNodes);
}

/**
 * @param {Text} text
 * @param {unknown} data
 * @returns {void}
 */
function set_data(text, data) {
	data = '' + data;
	if (text.data === data) return;
	text.data = /** @type {string} */ (data);
}

/**
 * @returns {void} */
function set_input_value(input, value) {
	input.value = value == null ? '' : value;
}

/**
 * @returns {void} */
function toggle_class(element, name, toggle) {
	// The `!!` is required because an `undefined` flag means flipping the current state.
	element.classList.toggle(name, !!toggle);
}

/**
 * @typedef {Node & {
 * 	claim_order?: number;
 * 	hydrate_init?: true;
 * 	actual_end_child?: NodeEx;
 * 	childNodes: NodeListOf<NodeEx>;
 * }} NodeEx
 */

/** @typedef {ChildNode & NodeEx} ChildNodeEx */

/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */

/**
 * @typedef {ChildNodeEx[] & {
 * 	claim_info?: {
 * 		last_index: number;
 * 		total_claimed: number;
 * 	};
 * }} ChildNodeArray
 */

let current_component;

/** @returns {void} */
function set_current_component(component) {
	current_component = component;
}

function get_current_component() {
	if (!current_component) throw new Error('Function called outside component initialization');
	return current_component;
}

/**
 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
 * it can be called from an external module).
 *
 * If a function is returned _synchronously_ from `onMount`, it will be called when the component is unmounted.
 *
 * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
 *
 * https://svelte.dev/docs/svelte#onmount
 * @template T
 * @param {() => import('./private.js').NotFunction<T> | Promise<import('./private.js').NotFunction<T>> | (() => any)} fn
 * @returns {void}
 */
function onMount(fn) {
	get_current_component().$$.on_mount.push(fn);
}

/**
 * Schedules a callback to run immediately before the component is unmounted.
 *
 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
 * only one that runs inside a server-side component.
 *
 * https://svelte.dev/docs/svelte#ondestroy
 * @param {() => any} fn
 * @returns {void}
 */
function onDestroy(fn) {
	get_current_component().$$.on_destroy.push(fn);
}

const dirty_components = [];
const binding_callbacks = [];

let render_callbacks = [];

const flush_callbacks = [];

const resolved_promise = /* @__PURE__ */ Promise.resolve();

let update_scheduled = false;

/** @returns {void} */
function schedule_update() {
	if (!update_scheduled) {
		update_scheduled = true;
		resolved_promise.then(flush);
	}
}

/** @returns {void} */
function add_render_callback(fn) {
	render_callbacks.push(fn);
}

// flush() calls callbacks in this order:
// 1. All beforeUpdate callbacks, in order: parents before children
// 2. All bind:this callbacks, in reverse order: children before parents.
// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
//    for afterUpdates called during the initial onMount, which are called in
//    reverse order: children before parents.
// Since callbacks might update component values, which could trigger another
// call to flush(), the following steps guard against this:
// 1. During beforeUpdate, any updated components will be added to the
//    dirty_components array and will cause a reentrant call to flush(). Because
//    the flush index is kept outside the function, the reentrant call will pick
//    up where the earlier call left off and go through all dirty components. The
//    current_component value is saved and restored so that the reentrant call will
//    not interfere with the "parent" flush() call.
// 2. bind:this callbacks cannot trigger new flush() calls.
// 3. During afterUpdate, any updated components will NOT have their afterUpdate
//    callback called a second time; the seen_callbacks set, outside the flush()
//    function, guarantees this behavior.
const seen_callbacks = new Set();

let flushidx = 0; // Do *not* move this inside the flush() function

/** @returns {void} */
function flush() {
	// Do not reenter flush while dirty components are updated, as this can
	// result in an infinite loop. Instead, let the inner flush handle it.
	// Reentrancy is ok afterwards for bindings etc.
	if (flushidx !== 0) {
		return;
	}
	const saved_component = current_component;
	do {
		// first, call beforeUpdate functions
		// and update components
		try {
			while (flushidx < dirty_components.length) {
				const component = dirty_components[flushidx];
				flushidx++;
				set_current_component(component);
				update(component.$$);
			}
		} catch (e) {
			// reset dirty state to not end up in a deadlocked state and then rethrow
			dirty_components.length = 0;
			flushidx = 0;
			throw e;
		}
		set_current_component(null);
		dirty_components.length = 0;
		flushidx = 0;
		while (binding_callbacks.length) binding_callbacks.pop()();
		// then, once components are updated, call
		// afterUpdate functions. This may cause
		// subsequent updates...
		for (let i = 0; i < render_callbacks.length; i += 1) {
			const callback = render_callbacks[i];
			if (!seen_callbacks.has(callback)) {
				// ...so guard against infinite loops
				seen_callbacks.add(callback);
				callback();
			}
		}
		render_callbacks.length = 0;
	} while (dirty_components.length);
	while (flush_callbacks.length) {
		flush_callbacks.pop()();
	}
	update_scheduled = false;
	seen_callbacks.clear();
	set_current_component(saved_component);
}

/** @returns {void} */
function update($$) {
	if ($$.fragment !== null) {
		$$.update();
		run_all($$.before_update);
		const dirty = $$.dirty;
		$$.dirty = [-1];
		$$.fragment && $$.fragment.p($$.ctx, dirty);
		$$.after_update.forEach(add_render_callback);
	}
}

/**
 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
 * @param {Function[]} fns
 * @returns {void}
 */
function flush_render_callbacks(fns) {
	const filtered = [];
	const targets = [];
	render_callbacks.forEach((c) => (fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c)));
	targets.forEach((c) => c());
	render_callbacks = filtered;
}

const outroing = new Set();

/**
 * @type {Outro}
 */
let outros;

/**
 * @returns {void} */
function group_outros() {
	outros = {
		r: 0,
		c: [],
		p: outros // parent group
	};
}

/**
 * @returns {void} */
function check_outros() {
	if (!outros.r) {
		run_all(outros.c);
	}
	outros = outros.p;
}

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} [local]
 * @returns {void}
 */
function transition_in(block, local) {
	if (block && block.i) {
		outroing.delete(block);
		block.i(local);
	}
}

/**
 * @param {import('./private.js').Fragment} block
 * @param {0 | 1} local
 * @param {0 | 1} [detach]
 * @param {() => void} [callback]
 * @returns {void}
 */
function transition_out(block, local, detach, callback) {
	if (block && block.o) {
		if (outroing.has(block)) return;
		outroing.add(block);
		outros.c.push(() => {
			outroing.delete(block);
			if (callback) {
				if (detach) block.d(1);
				callback();
			}
		});
		block.o(local);
	} else if (callback) {
		callback();
	}
}

/** @typedef {1} INTRO */
/** @typedef {0} OUTRO */
/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */

/**
 * @typedef {Object} Outro
 * @property {number} r
 * @property {Function[]} c
 * @property {Object} p
 */

/**
 * @typedef {Object} PendingProgram
 * @property {number} start
 * @property {INTRO|OUTRO} b
 * @property {Outro} [group]
 */

/**
 * @typedef {Object} Program
 * @property {number} a
 * @property {INTRO|OUTRO} b
 * @property {1|-1} d
 * @property {number} duration
 * @property {number} start
 * @property {number} end
 * @property {Outro} [group]
 */

/**
 * @template T
 * @param {Promise<T>} promise
 * @param {import('./private.js').PromiseInfo<T>} info
 * @returns {boolean}
 */
function handle_promise(promise, info) {
	const token = (info.token = {});
	/**
	 * @param {import('./private.js').FragmentFactory} type
	 * @param {0 | 1 | 2} index
	 * @param {number} [key]
	 * @param {any} [value]
	 * @returns {void}
	 */
	function update(type, index, key, value) {
		if (info.token !== token) return;
		info.resolved = value;
		let child_ctx = info.ctx;
		if (key !== undefined) {
			child_ctx = child_ctx.slice();
			child_ctx[key] = value;
		}
		const block = type && (info.current = type)(child_ctx);
		let needs_flush = false;
		if (info.block) {
			if (info.blocks) {
				info.blocks.forEach((block, i) => {
					if (i !== index && block) {
						group_outros();
						transition_out(block, 1, 1, () => {
							if (info.blocks[i] === block) {
								info.blocks[i] = null;
							}
						});
						check_outros();
					}
				});
			} else {
				info.block.d(1);
			}
			block.c();
			transition_in(block, 1);
			block.m(info.mount(), info.anchor);
			needs_flush = true;
		}
		info.block = block;
		if (info.blocks) info.blocks[index] = block;
		if (needs_flush) {
			flush();
		}
	}
	if (is_promise(promise)) {
		const current_component = get_current_component();
		promise.then(
			(value) => {
				set_current_component(current_component);
				update(info.then, 1, info.value, value);
				set_current_component(null);
			},
			(error) => {
				set_current_component(current_component);
				update(info.catch, 2, info.error, error);
				set_current_component(null);
				if (!info.hasCatch) {
					throw error;
				}
			}
		);
		// if we previously had a then/catch block, destroy it
		if (info.current !== info.pending) {
			update(info.pending, 0);
			return true;
		}
	} else {
		if (info.current !== info.then) {
			update(info.then, 1, info.value, promise);
			return true;
		}
		info.resolved = /** @type {T} */ (promise);
	}
}

/** @returns {void} */
function update_await_block_branch(info, ctx, dirty) {
	const child_ctx = ctx.slice();
	const { resolved } = info;
	if (info.current === info.then) {
		child_ctx[info.value] = resolved;
	}
	if (info.current === info.catch) {
		child_ctx[info.error] = resolved;
	}
	info.block.p(child_ctx, dirty);
}

// general each functions:

function ensure_array_like(array_like_or_iterator) {
	return array_like_or_iterator?.length !== undefined
		? array_like_or_iterator
		: Array.from(array_like_or_iterator);
}

/** @returns {{}} */
function get_spread_update(levels, updates) {
	const update = {};
	const to_null_out = {};
	const accounted_for = { $$scope: 1 };
	let i = levels.length;
	while (i--) {
		const o = levels[i];
		const n = updates[i];
		if (n) {
			for (const key in o) {
				if (!(key in n)) to_null_out[key] = 1;
			}
			for (const key in n) {
				if (!accounted_for[key]) {
					update[key] = n[key];
					accounted_for[key] = 1;
				}
			}
			levels[i] = n;
		} else {
			for (const key in o) {
				accounted_for[key] = 1;
			}
		}
	}
	for (const key in to_null_out) {
		if (!(key in update)) update[key] = undefined;
	}
	return update;
}

function get_spread_object(spread_props) {
	return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
}

/** @returns {void} */
function create_component(block) {
	block && block.c();
}

/** @returns {void} */
function mount_component(component, target, anchor) {
	const { fragment, after_update } = component.$$;
	fragment && fragment.m(target, anchor);
	// onMount happens before the initial afterUpdate
	add_render_callback(() => {
		const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
		// if the component was destroyed immediately
		// it will update the `$$.on_destroy` reference to `null`.
		// the destructured on_destroy may still reference to the old array
		if (component.$$.on_destroy) {
			component.$$.on_destroy.push(...new_on_destroy);
		} else {
			// Edge case - component was destroyed immediately,
			// most likely as a result of a binding initialising
			run_all(new_on_destroy);
		}
		component.$$.on_mount = [];
	});
	after_update.forEach(add_render_callback);
}

/** @returns {void} */
function destroy_component(component, detaching) {
	const $$ = component.$$;
	if ($$.fragment !== null) {
		flush_render_callbacks($$.after_update);
		run_all($$.on_destroy);
		$$.fragment && $$.fragment.d(detaching);
		// TODO null out other refs, including component.$$ (but need to
		// preserve final state?)
		$$.on_destroy = $$.fragment = null;
		$$.ctx = [];
	}
}

/** @returns {void} */
function make_dirty(component, i) {
	if (component.$$.dirty[0] === -1) {
		dirty_components.push(component);
		schedule_update();
		component.$$.dirty.fill(0);
	}
	component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
}

/** @returns {void} */
function init(
	component,
	options,
	instance,
	create_fragment,
	not_equal,
	props,
	append_styles,
	dirty = [-1]
) {
	const parent_component = current_component;
	set_current_component(component);
	/** @type {import('./private.js').T$$} */
	const $$ = (component.$$ = {
		fragment: null,
		ctx: [],
		// state
		props,
		update: noop,
		not_equal,
		bound: blank_object(),
		// lifecycle
		on_mount: [],
		on_destroy: [],
		on_disconnect: [],
		before_update: [],
		after_update: [],
		context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
		// everything else
		callbacks: blank_object(),
		dirty,
		skip_bound: false,
		root: options.target || parent_component.$$.root
	});
	append_styles && append_styles($$.root);
	let ready = false;
	$$.ctx = instance
		? instance(component, options.props || {}, (i, ret, ...rest) => {
				const value = rest.length ? rest[0] : ret;
				if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
					if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
					if (ready) make_dirty(component, i);
				}
				return ret;
		  })
		: [];
	$$.update();
	ready = true;
	run_all($$.before_update);
	// `false` as a special case of no DOM component
	$$.fragment = create_fragment ? create_fragment($$.ctx) : false;
	if (options.target) {
		if (options.hydrate) {
			const nodes = children(options.target);
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			$$.fragment && $$.fragment.l(nodes);
			nodes.forEach(detach);
		} else {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			$$.fragment && $$.fragment.c();
		}
		if (options.intro) transition_in(component.$$.fragment);
		mount_component(component, options.target, options.anchor);
		flush();
	}
	set_current_component(parent_component);
}

/**
 * Base class for Svelte components. Used when dev=false.
 *
 * @template {Record<string, any>} [Props=any]
 * @template {Record<string, any>} [Events=any]
 */
class SvelteComponent {
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$ = undefined;
	/**
	 * ### PRIVATE API
	 *
	 * Do not use, may change at any time
	 *
	 * @type {any}
	 */
	$$set = undefined;

	/** @returns {void} */
	$destroy() {
		destroy_component(this, 1);
		this.$destroy = noop;
	}

	/**
	 * @template {Extract<keyof Events, string>} K
	 * @param {K} type
	 * @param {((e: Events[K]) => void) | null | undefined} callback
	 * @returns {() => void}
	 */
	$on(type, callback) {
		if (!is_function(callback)) {
			return noop;
		}
		const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
		callbacks.push(callback);
		return () => {
			const index = callbacks.indexOf(callback);
			if (index !== -1) callbacks.splice(index, 1);
		};
	}

	/**
	 * @param {Partial<Props>} props
	 * @returns {void}
	 */
	$set(props) {
		if (this.$$set && !is_empty(props)) {
			this.$$.skip_bound = true;
			this.$$set(props);
			this.$$.skip_bound = false;
		}
	}
}

/**
 * @typedef {Object} CustomElementPropDefinition
 * @property {string} [attribute]
 * @property {boolean} [reflect]
 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
 */

// generated during release, do not modify

const PUBLIC_VERSION = '4';

if (typeof window !== 'undefined')
	// @ts-ignore
	(window.__svelte || (window.__svelte = { v: new Set() })).v.add(PUBLIC_VERSION);

function doCoordsEqual(c1, c2) {
  if (!c1 || !c2)
    return false;
  const [x1, y1] = c1;
  const [x2, y2] = c2;
  return x1 === x2 && y1 === y2;
}
function getKeyType(key) {
  const upperCasedKey = key.toLocaleUpperCase();
  if (upperCasedKey === "BACKSPACE" || upperCasedKey === "DELETE")
    return "delete";
  if (upperCasedKey.length !== 1)
    return "ignore";
  const charRegExp = /^[A-Z]|[1-9]$/;
  const matches = upperCasedKey.match(charRegExp);
  if (matches?.length) {
    return "char";
  }
  return "ignore";
}
function isFlagOn(flag) {
  const hashWithoutHashChar = location.hash.slice(1);
  const flags = hashWithoutHashChar.split("_");
  return !!flags.find((f) => f === flag);
}
class AlertError extends Error {
  constructor(message) {
    super(message);
    this.name = "Utils";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AlertError);
    }
    if (isFlagOn("alerterrors")) {
      window.alert(this.message);
    } else {
      window.alert("Something Went Wrong. Refresh the page! (and tell Peter where you clicked)");
    }
  }
}

class BoardModule {
  input;
  currentAHead;
  dHeads = [];
  nextId = 1;
  // head and orientation left, answers right
  headToAnswersMap;
  // answer on the left, head and orientation on right
  answersToHeads;
  /**
   * y is first dimension
   */
  rows;
  constructor(input) {
    this.input = input;
    this.headToAnswersMap = /* @__PURE__ */ new Map();
    this.rows = this.makeRows(input);
    this.answersToHeads = /* @__PURE__ */ new Map();
    this.reverseHeadToAnswersMap(this.headToAnswersMap);
  }
  ///////////////////
  // Basic Getters //
  ///////////////////
  getCell = (coord) => {
    const [x, y] = coord;
    return this.rows[y][x];
  };
  getRows = () => {
    return this.rows;
  };
  getAnswer = (coord, orientation) => {
    const key = this.getAnswersMapKey(coord, orientation);
    return this.headToAnswersMap.get(key);
  };
  getCrossReference = (answer) => {
    return this.answersToHeads.get(answer) || [];
  };
  getNextHead = (start, or) => {
    const [startX, startY] = start;
    const headKey = or === "across" ? "aHead" : "dHead";
    let x = startX;
    for (let y = startY; y < this.rows.length, y++; ) {
      for (; x < this.rows[y].length, x++; ) {
        const cell = this.getCell([x, y]);
        if (cell.type === "boarder")
          continue;
        const h = cell[headKey];
        if (h)
          return h;
      }
      x = 0;
    }
  };
  ////////////////////////////////////
  // Methods for board construction //
  ////////////////////////////////////
  makeRows = (input) => {
    return input.map(this.processRow);
  };
  processRow = (row, y) => {
    this.currentAHead = void 0;
    const rowOfTiles = row.map((cellVal, x) => {
      const currentCoord = [x, y];
      const type = this.getCellType(cellVal);
      return type === "boarder" ? this.createBoarder(currentCoord) : this.createCell(currentCoord, cellVal);
    });
    return rowOfTiles;
  };
  createCell = (coord, cellAnswer) => {
    const [x, y] = coord;
    let shouldAssignId = false;
    if (!this.currentAHead) {
      const a = this.input[y]?.[x - 1];
      const b = this.input[y]?.[x + 1];
      const newHead = this.getHead(coord, a, b);
      if (newHead)
        shouldAssignId = true;
      this.currentAHead = newHead;
    }
    if (!this.dHeads[x]) {
      const a = this.input[y - 1]?.[x];
      const b = this.input[y + 1]?.[x];
      const newHead = this.getHead(coord, a, b);
      if (newHead)
        shouldAssignId = true;
      this.dHeads[x] = newHead;
    }
    this.updateAnswersMap(this.currentAHead, cellAnswer, "across");
    this.updateAnswersMap(this.dHeads[x], cellAnswer, "down");
    return {
      type: "cell",
      answer: cellAnswer,
      aHead: this.currentAHead,
      dHead: this.dHeads[x],
      coordinate: coord,
      id: shouldAssignId ? this.nextId++ : void 0
    };
  };
  getAnswersMapKey = (head, orientation) => {
    return `x${head[0]}y${head[1]}_${orientation}`;
  };
  deconstructAnswersMapKey = (key) => {
    const r = /x(\d+)y(\d+)_(across|down)/;
    const parts = key.match(r);
    if (parts?.length !== 4)
      throw new AlertError(`Invalid Key to deconstruct ${key}`);
    const [_, x, y, or] = parts;
    return {
      x: parseInt(x),
      y: parseInt(y),
      or
    };
  };
  updateAnswersMap = (head, cellAnswer, orientation) => {
    if (!head)
      return;
    const key = this.getAnswersMapKey(head, orientation);
    let answer = this.headToAnswersMap.get(key);
    if (!answer)
      answer = "";
    answer += cellAnswer;
    this.headToAnswersMap.set(key, answer);
  };
  getHead = (coord, a, b) => {
    let aType = "boarder";
    if (a)
      aType = this.getCellType(a);
    let bType = "boarder";
    if (b)
      bType = this.getCellType(b);
    if (aType === "boarder" && bType === "boarder")
      return void 0;
    return coord;
  };
  createBoarder = (coord) => {
    const [x, y] = coord;
    this.currentAHead = void 0;
    this.dHeads[x] = void 0;
    return {
      type: "boarder",
      coordinate: coord
    };
  };
  getCellType = (c) => {
    if (c === "" || c === "xx")
      return "boarder";
    if (c.length !== 1)
      throw new AlertError(`Invalid Cell! ${c}`);
    return "cell";
  };
  reverseHeadToAnswersMap = (headToAnswersMap) => {
    headToAnswersMap.forEach((answer, orientationAndHead) => {
      const { x, y, or } = this.deconstructAnswersMapKey(orientationAndHead);
      let entry = this.answersToHeads.get(answer);
      if (!entry)
        entry = [];
      const cell = this.rows[y][x];
      if (cell.type === "boarder")
        throw new AlertError("Cross Referenced Key to a Boarder!: " + orientationAndHead);
      const id = cell.id;
      if (!id)
        throw new AlertError("Cross Referenced to Non-Head!");
      const head = [x, y];
      entry.push({ id, or, head });
      this.answersToHeads.set(answer, entry);
    });
  };
}
class BoardSingleton {
  static board;
  constructor() {
  }
  static set = (b) => {
    if (this.board)
      throw new AlertError("BoardSingleton already set!");
    this.board = b;
  };
  static get = () => {
    if (!this.board)
      throw new AlertError("BoardSingleton never set!");
    return this.board;
  };
  static isBoarder = (coord) => {
    const cell = this.board?.getCell(coord);
    if (!cell)
      return true;
    return cell.type === "boarder";
  };
  static getNextHead = (start, or) => {
    if (!this.board)
      throw new AlertError("BoardSingleton never set!");
    const startsHead = this.getHead(start, or);
    if (!startsHead)
      return start;
    let nextHead = this.board.getNextHead(startsHead, or);
    if (nextHead)
      return nextHead;
    return start;
  };
  static getHead(coord, or) {
    if (!this.board)
      throw new AlertError("BoardSingleton never set!");
    const cell = this.board.getCell(coord);
    if (cell.type === "boarder")
      return void 0;
    return or === "across" ? cell.aHead : cell.dHead;
  }
  static getCrossReference = (answer) => {
    if (!this.board)
      throw new AlertError("BoardSingleton never set!");
    return this.board.getCrossReference(answer);
  };
}

const subscriber_queue = [];

/**
 * Create a `Writable` store that allows both updating and reading by subscription.
 *
 * https://svelte.dev/docs/svelte-store#writable
 * @template T
 * @param {T} [value] initial value
 * @param {import('./public.js').StartStopNotifier<T>} [start]
 * @returns {import('./public.js').Writable<T>}
 */
function writable(value, start = noop) {
	/** @type {import('./public.js').Unsubscriber} */
	let stop;
	/** @type {Set<import('./private.js').SubscribeInvalidateTuple<T>>} */
	const subscribers = new Set();
	/** @param {T} new_value
	 * @returns {void}
	 */
	function set(new_value) {
		if (safe_not_equal(value, new_value)) {
			value = new_value;
			if (stop) {
				// store is ready
				const run_queue = !subscriber_queue.length;
				for (const subscriber of subscribers) {
					subscriber[1]();
					subscriber_queue.push(subscriber, value);
				}
				if (run_queue) {
					for (let i = 0; i < subscriber_queue.length; i += 2) {
						subscriber_queue[i][0](subscriber_queue[i + 1]);
					}
					subscriber_queue.length = 0;
				}
			}
		}
	}

	/**
	 * @param {import('./public.js').Updater<T>} fn
	 * @returns {void}
	 */
	function update(fn) {
		set(fn(value));
	}

	/**
	 * @param {import('./public.js').Subscriber<T>} run
	 * @param {import('./private.js').Invalidator<T>} [invalidate]
	 * @returns {import('./public.js').Unsubscriber}
	 */
	function subscribe(run, invalidate = noop) {
		/** @type {import('./private.js').SubscribeInvalidateTuple<T>} */
		const subscriber = [run, invalidate];
		subscribers.add(subscriber);
		if (subscribers.size === 1) {
			stop = start(set, update) || noop;
		}
		run(value);
		return () => {
			subscribers.delete(subscriber);
			if (subscribers.size === 0 && stop) {
				stop();
				stop = null;
			}
		};
	}
	return { set, update, subscribe };
}

const selectedCellStore = writable();
const currentHeadStore = writable();
const referencedAnswersStore = writable([]);
class StoreReader {
  orientation = "across";
  currentHead;
  selectedCell;
  referencedAnswers = [];
  static instance;
  constructor() {
    this.setOrientation = this.setOrientation.bind(this);
    this.getOrientation = this.getOrientation.bind(this);
    this.setCurrentHead = this.setCurrentHead.bind(this);
    currentHeadStore.subscribe(this.setCurrentHead);
    this.getCurrentHead = this.getCurrentHead.bind(this);
    this.setSelectedCell = this.setSelectedCell.bind(this);
    selectedCellStore.subscribe(this.setSelectedCell);
    this.getCurrentCell = this.getCurrentCell.bind(this);
    this.setReferencedAnswers = this.setReferencedAnswers.bind(this);
    referencedAnswersStore.subscribe(this.setReferencedAnswers);
    this.getReferencedAnswers = this.getReferencedAnswers.bind(this);
  }
  static get() {
    if (!this.instance) {
      this.instance = new StoreReader();
    }
    return this.instance;
  }
  toggleOrientation() {
    if (this.orientation === "across") {
      this.orientation = "down";
    } else {
      this.orientation = "across";
    }
    return this.orientation;
  }
  setOrientation(value) {
    this.orientation = value;
  }
  getOrientation() {
    return this.orientation;
  }
  setCurrentHead(value) {
    this.currentHead = value?.head;
  }
  getCurrentHead() {
    return this.currentHead;
  }
  setSelectedCell(value) {
    this.selectedCell = value?.coordinate;
  }
  getCurrentCell() {
    return this.selectedCell;
  }
  setReferencedAnswers(value) {
    this.referencedAnswers = value;
  }
  getReferencedAnswers() {
    return this.referencedAnswers;
  }
}
const storeReaderSingleton = StoreReader.get();

function scrubClue(clue) {
  if (!shouldScrubBrackets(clue)) {
    referencedAnswersStore.set([]);
    return clue;
  }
  let scrubbedClue = "";
  const parts = clue.split(/\[|\]/);
  let shouldScrubThisPart = false;
  const referencedAnswersToEmit = [];
  parts.forEach((p) => {
    if (shouldScrubThisPart) {
      const {
        strToShow,
        referencedAnswers
      } = getReplacement(p);
      scrubbedClue += strToShow;
      const refs = referencedAnswers.map((a) => ({
        orientation: a.or,
        head: a.head
      }));
      referencedAnswersToEmit.push(...refs);
    } else {
      scrubbedClue += p;
    }
    shouldScrubThisPart = !shouldScrubThisPart;
  });
  referencedAnswersStore.set(referencedAnswersToEmit);
  return scrubbedClue;
}
function getReplacement(answer) {
  const referencedAnswers = BoardSingleton.getCrossReference(answer);
  const convertToPresentableString = (crossRef) => {
    return `${crossRef.id}${crossRef.or.slice(0, 1).toLocaleUpperCase()}`;
  };
  if (referencedAnswers.length === 0) {
    throw new AlertError("Cross Reference Not Found! Looking for " + answer);
  }
  let strToShow = "";
  if (referencedAnswers.length === 1) {
    strToShow = convertToPresentableString(referencedAnswers[0]);
  } else {
    strToShow = convertToPresentableString(referencedAnswers[0]);
    referencedAnswers.forEach((o, idx) => {
      if (idx === 0)
        return;
      strToShow += " and " + convertToPresentableString(o);
    });
  }
  return {
    strToShow,
    referencedAnswers
  };
}
function shouldScrubBrackets(clue) {
  const leftBracketsNum = clue.match(/\[/g)?.length;
  const rightBracketsNum = clue.match(/\[/g)?.length;
  if (leftBracketsNum !== rightBracketsNum) {
    throw new AlertError(`Invalid clue format. L Brackets: ${leftBracketsNum}, R Brackets: ${rightBracketsNum} for clue "${clue}"`);
  }
  return !!leftBracketsNum;
}

const Header_svelte_svelte_type_style_lang = '';

/* C:/Users/LENOVO/Documents/workspace/fightmilkcrossword/src/lib/Header.svelte generated by Svelte v4.2.0 */

function create_fragment$6(ctx) {
	let div;
	let h2;
	let t;

	return {
		c() {
			div = element("div");
			h2 = element("h2");
			t = text$1(/*clueToShow*/ ctx[0]);
			attr(div, "class", "sticky-header svelte-13xt86h");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, h2);
			append(h2, t);
		},
		p(ctx, [dirty]) {
			if (dirty & /*clueToShow*/ 1) set_data(t, /*clueToShow*/ ctx[0]);
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(div);
			}
		}
	};
}

function instance$5($$self, $$props, $$invalidate) {
	let { answerKey } = $$props;
	let { board } = $$props;
	const answerKeyMap = /* @__PURE__ */ new Map();

	answerKey.forEach(e => {
		if (answerKeyMap.has(e.answer)) throw new AlertError(`DUPLICATE ANSWER ${e}`);
		answerKeyMap.set(e.answer, e.clue);
	});

	let clueToShow = "Click a cell you dummy!";

	currentHeadStore.subscribe(event => {
		if (!event || !event.head) return;
		const headCoord = event.head;
		const orientation = storeReaderSingleton.getOrientation();
		const answer = board.getAnswer(headCoord, orientation);
		if (!answer) return;
		const clue = answerKeyMap.get(answer);

		if (!clue) {
			throw new AlertError(`UNKNOWN ANSWER: ${answer}. For head ${headCoord}`);
		}

		$$invalidate(0, clueToShow = scrubClue(clue));
	});

	$$self.$$set = $$props => {
		if ('answerKey' in $$props) $$invalidate(1, answerKey = $$props.answerKey);
		if ('board' in $$props) $$invalidate(2, board = $$props.board);
	};

	return [clueToShow, answerKey, board];
}

class Header extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$5, create_fragment$6, safe_not_equal, { answerKey: 1, board: 2 });
	}
}

const Boarder_svelte_svelte_type_style_lang = '';

/* C:/Users/LENOVO/Documents/workspace/fightmilkcrossword/src/lib/Boarder.svelte generated by Svelte v4.2.0 */

function create_fragment$5(ctx) {
	let input;

	return {
		c() {
			input = element("input");
			input.disabled = true;
			attr(input, "class", "svelte-1j99cx5");
		},
		m(target, anchor) {
			insert(target, input, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(input);
			}
		}
	};
}

function instance$4($$self, $$props, $$invalidate) {
	let { coordinate } = $$props;

	$$self.$$set = $$props => {
		if ('coordinate' in $$props) $$invalidate(0, coordinate = $$props.coordinate);
	};

	return [coordinate];
}

class Boarder extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$4, create_fragment$5, safe_not_equal, { coordinate: 0 });
	}
}

class SavedStateModule {
  remove = (coord) => {
    const key = this.getCoordKey(coord);
    localStorage.removeItem(key);
  };
  write = (coord, val) => {
    const key = this.getCoordKey(coord);
    if (val === "") {
      this.remove(coord);
    } else {
      localStorage.setItem(key, val);
    }
  };
  clearAll = () => {
    localStorage.clear();
  };
  get = (coord) => {
    const key = this.getCoordKey(coord);
    const val = localStorage.getItem(key);
    if (val)
      return val;
    return "";
  };
  getCoordKey = (coord) => {
    const [x, y] = coord;
    return `fightMilkCrossWord_x${x}_y${y}`;
  };
}
const savedStateModule = new SavedStateModule();

function getNextCell(coordinate, or) {
  const [x, y] = coordinate;
  const nextCoord = or === "across" ? [x + 1, y] : [x, y + 1];
  return nextCoord;
}
function getPreviousCell(coordinate, or) {
  const [x, y] = coordinate;
  const nextCoord = or === "across" ? [x - 1, y] : [x, y - 1];
  return nextCoord;
}
function onCellClick(props) {
  let or = storeReaderSingleton.getOrientation();
  const clickedCell = props.coordinate;
  const selectedCell = storeReaderSingleton.getCurrentCell();
  if (doCoordsEqual(clickedCell, selectedCell)) {
    or = storeReaderSingleton.toggleOrientation();
  }
  let head;
  if (!props.aHead && !props.dHead) {
    console.error(`Cell ${props.coordinate} has no associated head!`);
  } else if (!props.aHead && props.dHead) {
    head = props.dHead;
  } else if (!props.dHead && props.aHead) {
    head = props.aHead;
  } else {
    head = or === "across" ? props.aHead : props.dHead;
  }
  currentHeadStore.set({
    head,
    orientation: or
  });
  selectedCellStore.set({
    coordinate: clickedCell,
    clear: false
  });
}
function onCellInput(props) {
  const { coordinate, pressedKey } = props;
  const keyType = getKeyType(pressedKey);
  if (keyType === "ignore")
    return;
  const or = storeReaderSingleton.getOrientation();
  if (keyType === "delete") {
    savedStateModule.remove(coordinate);
    const prevCoord = getPreviousCell(coordinate, or);
    selectedCellStore.set({
      coordinate: prevCoord,
      clear: true
    });
  }
  if (keyType === "char") {
    savedStateModule.write(coordinate, pressedKey);
    let nextCoord = getNextCell(coordinate, or);
    if (!BoardSingleton.isBoarder(nextCoord)) {
      selectedCellStore.set({
        coordinate: nextCoord,
        clear: false
      });
      return;
    }
    nextCoord = BoardSingleton.getNextHead(coordinate, or);
    onCellClick({
      coordinate: nextCoord,
      aHead: BoardSingleton.getHead(nextCoord, "across"),
      dHead: BoardSingleton.getHead(nextCoord, "down")
    });
  }
}

const Cell_svelte_svelte_type_style_lang = '';

/* C:/Users/LENOVO/Documents/workspace/fightmilkcrossword/src/lib/Cell.svelte generated by Svelte v4.2.0 */

function create_if_block$1(ctx) {
	let div;
	let t;
	let mounted;
	let dispose;

	return {
		c() {
			div = element("div");
			t = text$1(/*id*/ ctx[0]);
			attr(div, "class", "badge svelte-qxvs82");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			append(div, t);

			if (!mounted) {
				dispose = listen(div, "click", /*onBadgeClick*/ ctx[7]);
				mounted = true;
			}
		},
		p(ctx, dirty) {
			if (dirty & /*id*/ 1) set_data(t, /*id*/ ctx[0]);
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			mounted = false;
			dispose();
		}
	};
}

function create_fragment$4(ctx) {
	let div;
	let t;
	let input;
	let mounted;
	let dispose;
	let if_block = /*id*/ ctx[0] && create_if_block$1(ctx);

	return {
		c() {
			div = element("div");
			if (if_block) if_block.c();
			t = space();
			input = element("input");
			attr(input, "class", "svelte-qxvs82");
			toggle_class(input, "should-highlight", /*shouldHighlight*/ ctx[1]);
			toggle_class(input, "is-referenced", /*isReferencedAndShouldShow*/ ctx[4]);
			attr(div, "class", "container svelte-qxvs82");
		},
		m(target, anchor) {
			insert(target, div, anchor);
			if (if_block) if_block.m(div, null);
			append(div, t);
			append(div, input);
			set_input_value(input, /*value*/ ctx[3]);
			/*input_binding*/ ctx[15](input);

			if (!mounted) {
				dispose = [
					listen(input, "input", /*input_input_handler*/ ctx[14]),
					listen(input, "keyup", /*onkeyup*/ ctx[5]),
					listen(input, "click", /*onclick*/ ctx[6])
				];

				mounted = true;
			}
		},
		p(ctx, [dirty]) {
			if (/*id*/ ctx[0]) {
				if (if_block) {
					if_block.p(ctx, dirty);
				} else {
					if_block = create_if_block$1(ctx);
					if_block.c();
					if_block.m(div, t);
				}
			} else if (if_block) {
				if_block.d(1);
				if_block = null;
			}

			if (dirty & /*value*/ 8 && input.value !== /*value*/ ctx[3]) {
				set_input_value(input, /*value*/ ctx[3]);
			}

			if (dirty & /*shouldHighlight*/ 2) {
				toggle_class(input, "should-highlight", /*shouldHighlight*/ ctx[1]);
			}

			if (dirty & /*isReferencedAndShouldShow*/ 16) {
				toggle_class(input, "is-referenced", /*isReferencedAndShouldShow*/ ctx[4]);
			}
		},
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			if (if_block) if_block.d();
			/*input_binding*/ ctx[15](null);
			mounted = false;
			run_all(dispose);
		}
	};
}

function instance$3($$self, $$props, $$invalidate) {
	const type = "cell";
	let { dHead = void 0 } = $$props;
	let { aHead = void 0 } = $$props;
	let { answer } = $$props;
	let { coordinate } = $$props;
	let { id = void 0 } = $$props;
	let me;
	let unsubs = [];
	let value = "";
	let shouldHighlight = false;
	let isReferenced = false;
	let isReferencedAndShouldShow = false;

	onMount(() => {
		$$invalidate(3, value = savedStateModule.get(coordinate));
		if (isFlagOn("cheat")) $$invalidate(3, value = answer);

		const nextFocusUnsub = selectedCellStore.subscribe(event => {
			if (!event) return;
			if (!doCoordsEqual(event.coordinate, coordinate)) return;
			me.focus();

			if (event.clear) {
				$$invalidate(3, value = "");
			}
		});

		const currentHeadUnsub = currentHeadStore.subscribe(event => {
			if (!event) return;
			const { head, orientation } = event;
			if (!head) return;
			if (orientation === "across") $$invalidate(1, shouldHighlight = doCoordsEqual(aHead, head));
			if (orientation === "down") $$invalidate(1, shouldHighlight = doCoordsEqual(dHead, head));
		});

		const referencedAnswerUnsub = referencedAnswersStore.subscribe(references => {
			let isToBeReferenced = false;

			references.forEach(ref => {
				if (isToBeReferenced) return;
				const head = ref.orientation === "across" ? aHead : dHead;
				isToBeReferenced = doCoordsEqual(head, ref.head);
			});

			$$invalidate(13, isReferenced = isToBeReferenced);
		});

		unsubs.push(nextFocusUnsub);
		unsubs.push(currentHeadUnsub);
		unsubs.push(referencedAnswerUnsub);
	});

	onDestroy(() => {
		unsubs.forEach(u => u());
	});

	const onkeyup = e => {
		$$invalidate(3, value = value.toUpperCase());

		if (value.length > 1) {
			$$invalidate(3, value = value.slice(-1));
		}

		onCellInput({ coordinate, pressedKey: e.key });
	};

	const onclick = () => {
		onCellClick({ aHead, dHead, coordinate });
	};

	const onBadgeClick = () => {
		me.focus();
		onclick();
	};

	function input_input_handler() {
		value = this.value;
		$$invalidate(3, value);
	}

	function input_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			me = $$value;
			$$invalidate(2, me);
		});
	}

	$$self.$$set = $$props => {
		if ('dHead' in $$props) $$invalidate(9, dHead = $$props.dHead);
		if ('aHead' in $$props) $$invalidate(10, aHead = $$props.aHead);
		if ('answer' in $$props) $$invalidate(11, answer = $$props.answer);
		if ('coordinate' in $$props) $$invalidate(12, coordinate = $$props.coordinate);
		if ('id' in $$props) $$invalidate(0, id = $$props.id);
	};

	$$self.$$.update = () => {
		if ($$self.$$.dirty & /*isReferenced, shouldHighlight*/ 8194) {
			$$invalidate(4, isReferencedAndShouldShow = isReferenced && !shouldHighlight);
		}
	};

	return [
		id,
		shouldHighlight,
		me,
		value,
		isReferencedAndShouldShow,
		onkeyup,
		onclick,
		onBadgeClick,
		type,
		dHead,
		aHead,
		answer,
		coordinate,
		isReferenced,
		input_input_handler,
		input_binding
	];
}

class Cell extends SvelteComponent {
	constructor(options) {
		super();

		init(this, options, instance$3, create_fragment$4, safe_not_equal, {
			type: 8,
			dHead: 9,
			aHead: 10,
			answer: 11,
			coordinate: 12,
			id: 0
		});
	}

	get type() {
		return this.$$.ctx[8];
	}
}

/* C:/Users/LENOVO/Documents/workspace/fightmilkcrossword/src/lib/Row.svelte generated by Svelte v4.2.0 */

function get_each_context$1(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[1] = list[i];
	return child_ctx;
}

// (10:4) {:else}
function create_else_block(ctx) {
	let boarder;
	let current;
	const boarder_spread_levels = [/*cell*/ ctx[1]];
	let boarder_props = {};

	for (let i = 0; i < boarder_spread_levels.length; i += 1) {
		boarder_props = assign(boarder_props, boarder_spread_levels[i]);
	}

	boarder = new Boarder({ props: boarder_props });

	return {
		c() {
			create_component(boarder.$$.fragment);
		},
		m(target, anchor) {
			mount_component(boarder, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const boarder_changes = (dirty & /*tiles*/ 1)
			? get_spread_update(boarder_spread_levels, [get_spread_object(/*cell*/ ctx[1])])
			: {};

			boarder.$set(boarder_changes);
		},
		i(local) {
			if (current) return;
			transition_in(boarder.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(boarder.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(boarder, detaching);
		}
	};
}

// (8:4) {#if cell.type === "cell"}
function create_if_block(ctx) {
	let cell_1;
	let current;
	const cell_1_spread_levels = [/*cell*/ ctx[1]];
	let cell_1_props = {};

	for (let i = 0; i < cell_1_spread_levels.length; i += 1) {
		cell_1_props = assign(cell_1_props, cell_1_spread_levels[i]);
	}

	cell_1 = new Cell({ props: cell_1_props });

	return {
		c() {
			create_component(cell_1.$$.fragment);
		},
		m(target, anchor) {
			mount_component(cell_1, target, anchor);
			current = true;
		},
		p(ctx, dirty) {
			const cell_1_changes = (dirty & /*tiles*/ 1)
			? get_spread_update(cell_1_spread_levels, [get_spread_object(/*cell*/ ctx[1])])
			: {};

			cell_1.$set(cell_1_changes);
		},
		i(local) {
			if (current) return;
			transition_in(cell_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(cell_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(cell_1, detaching);
		}
	};
}

// (7:0) {#each tiles as cell}
function create_each_block$1(ctx) {
	let current_block_type_index;
	let if_block;
	let if_block_anchor;
	let current;
	const if_block_creators = [create_if_block, create_else_block];
	const if_blocks = [];

	function select_block_type(ctx, dirty) {
		if (/*cell*/ ctx[1].type === "cell") return 0;
		return 1;
	}

	current_block_type_index = select_block_type(ctx);
	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

	return {
		c() {
			if_block.c();
			if_block_anchor = empty();
		},
		m(target, anchor) {
			if_blocks[current_block_type_index].m(target, anchor);
			insert(target, if_block_anchor, anchor);
			current = true;
		},
		p(ctx, dirty) {
			let previous_block_index = current_block_type_index;
			current_block_type_index = select_block_type(ctx);

			if (current_block_type_index === previous_block_index) {
				if_blocks[current_block_type_index].p(ctx, dirty);
			} else {
				group_outros();

				transition_out(if_blocks[previous_block_index], 1, 1, () => {
					if_blocks[previous_block_index] = null;
				});

				check_outros();
				if_block = if_blocks[current_block_type_index];

				if (!if_block) {
					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
					if_block.c();
				} else {
					if_block.p(ctx, dirty);
				}

				transition_in(if_block, 1);
				if_block.m(if_block_anchor.parentNode, if_block_anchor);
			}
		},
		i(local) {
			if (current) return;
			transition_in(if_block);
			current = true;
		},
		o(local) {
			transition_out(if_block);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(if_block_anchor);
			}

			if_blocks[current_block_type_index].d(detaching);
		}
	};
}

function create_fragment$3(ctx) {
	let each_1_anchor;
	let current;
	let each_value = ensure_array_like(/*tiles*/ ctx[0]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			each_1_anchor = empty();
		},
		m(target, anchor) {
			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(target, anchor);
				}
			}

			insert(target, each_1_anchor, anchor);
			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*tiles*/ 1) {
				each_value = ensure_array_like(/*tiles*/ ctx[0]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context$1(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block$1(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(each_1_anchor);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$2($$self, $$props, $$invalidate) {
	let { tiles } = $$props;

	$$self.$$set = $$props => {
		if ('tiles' in $$props) $$invalidate(0, tiles = $$props.tiles);
	};

	return [tiles];
}

class Row extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$2, create_fragment$3, safe_not_equal, { tiles: 0 });
	}
}

const Board_svelte_svelte_type_style_lang = '';

/* C:/Users/LENOVO/Documents/workspace/fightmilkcrossword/src/lib/Board.svelte generated by Svelte v4.2.0 */

function get_each_context(ctx, list, i) {
	const child_ctx = ctx.slice();
	child_ctx[2] = list[i];
	return child_ctx;
}

// (8:4) {#each rows as row}
function create_each_block(ctx) {
	let row_1;
	let t;
	let br;
	let current;
	row_1 = new Row({ props: { tiles: /*row*/ ctx[2] } });

	return {
		c() {
			create_component(row_1.$$.fragment);
			t = space();
			br = element("br");
		},
		m(target, anchor) {
			mount_component(row_1, target, anchor);
			insert(target, t, anchor);
			insert(target, br, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(row_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(row_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(t);
				detach(br);
			}

			destroy_component(row_1, detaching);
		}
	};
}

function create_fragment$2(ctx) {
	let div;
	let current;
	let each_value = ensure_array_like(/*rows*/ ctx[0]);
	let each_blocks = [];

	for (let i = 0; i < each_value.length; i += 1) {
		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
	}

	const out = i => transition_out(each_blocks[i], 1, 1, () => {
		each_blocks[i] = null;
	});

	return {
		c() {
			div = element("div");

			for (let i = 0; i < each_blocks.length; i += 1) {
				each_blocks[i].c();
			}

			attr(div, "class", "board svelte-c8o6fy");
		},
		m(target, anchor) {
			insert(target, div, anchor);

			for (let i = 0; i < each_blocks.length; i += 1) {
				if (each_blocks[i]) {
					each_blocks[i].m(div, null);
				}
			}

			current = true;
		},
		p(ctx, [dirty]) {
			if (dirty & /*rows*/ 1) {
				each_value = ensure_array_like(/*rows*/ ctx[0]);
				let i;

				for (i = 0; i < each_value.length; i += 1) {
					const child_ctx = get_each_context(ctx, each_value, i);

					if (each_blocks[i]) {
						each_blocks[i].p(child_ctx, dirty);
						transition_in(each_blocks[i], 1);
					} else {
						each_blocks[i] = create_each_block(child_ctx);
						each_blocks[i].c();
						transition_in(each_blocks[i], 1);
						each_blocks[i].m(div, null);
					}
				}

				group_outros();

				for (i = each_value.length; i < each_blocks.length; i += 1) {
					out(i);
				}

				check_outros();
			}
		},
		i(local) {
			if (current) return;

			for (let i = 0; i < each_value.length; i += 1) {
				transition_in(each_blocks[i]);
			}

			current = true;
		},
		o(local) {
			each_blocks = each_blocks.filter(Boolean);

			for (let i = 0; i < each_blocks.length; i += 1) {
				transition_out(each_blocks[i]);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(div);
			}

			destroy_each(each_blocks, detaching);
		}
	};
}

function instance$1($$self, $$props, $$invalidate) {
	let { board } = $$props;
	const rows = board.getRows();

	$$self.$$set = $$props => {
		if ('board' in $$props) $$invalidate(1, board = $$props.board);
	};

	return [rows, board];
}

class Board extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance$1, create_fragment$2, safe_not_equal, { board: 1 });
	}
}

/* C:/Users/LENOVO/Documents/workspace/fightmilkcrossword/src/lib/Loading.svelte generated by Svelte v4.2.0 */

function create_fragment$1(ctx) {
	let p;

	return {
		c() {
			p = element("p");
			p.textContent = `${text}`;
		},
		m(target, anchor) {
			insert(target, p, anchor);
		},
		p: noop,
		i: noop,
		o: noop,
		d(detaching) {
			if (detaching) {
				detach(p);
			}
		}
	};
}

let text = 'Loading... This is a big ass crossword. Gimme a min';

class Loading extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, null, create_fragment$1, safe_not_equal, {});
	}
}

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var papaparse_min = {exports: {}};

/* @license
Papa Parse
v5.4.1
https://github.com/mholt/PapaParse
License: MIT
*/

(function (module, exports) {
	!function(e,t){module.exports=t();}(commonjsGlobal,function s(){var f="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==f?f:{};var n=!f.document&&!!f.postMessage,o=f.IS_PAPA_WORKER||!1,a={},u=0,b={parse:function(e,t){var r=(t=t||{}).dynamicTyping||!1;J(r)&&(t.dynamicTypingFunction=r,r={});if(t.dynamicTyping=r,t.transform=!!J(t.transform)&&t.transform,t.worker&&b.WORKERS_SUPPORTED){var i=function(){if(!b.WORKERS_SUPPORTED)return !1;var e=(r=f.URL||f.webkitURL||null,i=s.toString(),b.BLOB_URL||(b.BLOB_URL=r.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",i,")();"],{type:"text/javascript"})))),t=new f.Worker(e);var r,i;return t.onmessage=_,t.id=u++,a[t.id]=t}();return i.userStep=t.step,i.userChunk=t.chunk,i.userComplete=t.complete,i.userError=t.error,t.step=J(t.step),t.chunk=J(t.chunk),t.complete=J(t.complete),t.error=J(t.error),delete t.worker,void i.postMessage({input:e,config:t,workerId:i.id})}var n=null;b.NODE_STREAM_INPUT,"string"==typeof e?(e=function(e){if(65279===e.charCodeAt(0))return e.slice(1);return e}(e),n=t.download?new l(t):new p(t)):!0===e.readable&&J(e.read)&&J(e.on)?n=new g(t):(f.File&&e instanceof File||e instanceof Object)&&(n=new c(t));return n.stream(e)},unparse:function(e,t){var n=!1,_=!0,m=",",y="\r\n",s='"',a=s+s,r=!1,i=null,o=!1;!function(){if("object"!=typeof t)return;"string"!=typeof t.delimiter||b.BAD_DELIMITERS.filter(function(e){return -1!==t.delimiter.indexOf(e)}).length||(m=t.delimiter);("boolean"==typeof t.quotes||"function"==typeof t.quotes||Array.isArray(t.quotes))&&(n=t.quotes);"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(r=t.skipEmptyLines);"string"==typeof t.newline&&(y=t.newline);"string"==typeof t.quoteChar&&(s=t.quoteChar);"boolean"==typeof t.header&&(_=t.header);if(Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");i=t.columns;}void 0!==t.escapeChar&&(a=t.escapeChar+s);("boolean"==typeof t.escapeFormulae||t.escapeFormulae instanceof RegExp)&&(o=t.escapeFormulae instanceof RegExp?t.escapeFormulae:/^[=+\-@\t\r].*$/);}();var u=new RegExp(Q(s),"g");"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return h(null,e,r);if("object"==typeof e[0])return h(i||Object.keys(e[0]),e,r)}else if("object"==typeof e)return "string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||i),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),h(e.fields||[],e.data||[],r);throw new Error("Unable to serialize unrecognized input");function h(e,t,r){var i="";"string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t));var n=Array.isArray(e)&&0<e.length,s=!Array.isArray(t[0]);if(n&&_){for(var a=0;a<e.length;a++)0<a&&(i+=m),i+=v(e[a],a);0<t.length&&(i+=y);}for(var o=0;o<t.length;o++){var u=n?e.length:t[o].length,h=!1,f=n?0===Object.keys(t[o]).length:0===t[o].length;if(r&&!n&&(h="greedy"===r?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===r&&n){for(var d=[],l=0;l<u;l++){var c=s?e[l]:l;d.push(t[o][c]);}h=""===d.join("").trim();}if(!h){for(var p=0;p<u;p++){0<p&&!f&&(i+=m);var g=n&&s?e[p]:p;i+=v(t[o][g],p);}o<t.length-1&&(!r||0<u&&!f)&&(i+=y);}}return i}function v(e,t){if(null==e)return "";if(e.constructor===Date)return JSON.stringify(e).slice(1,25);var r=!1;o&&"string"==typeof e&&o.test(e)&&(e="'"+e,r=!0);var i=e.toString().replace(u,a);return (r=r||!0===n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||function(e,t){for(var r=0;r<t.length;r++)if(-1<e.indexOf(t[r]))return !0;return !1}(i,b.BAD_DELIMITERS)||-1<i.indexOf(m)||" "===i.charAt(0)||" "===i.charAt(i.length-1))?s+i+s:i}}};if(b.RECORD_SEP=String.fromCharCode(30),b.UNIT_SEP=String.fromCharCode(31),b.BYTE_ORDER_MARK="\ufeff",b.BAD_DELIMITERS=["\r","\n",'"',b.BYTE_ORDER_MARK],b.WORKERS_SUPPORTED=!n&&!!f.Worker,b.NODE_STREAM_INPUT=1,b.LocalChunkSize=10485760,b.RemoteChunkSize=5242880,b.DefaultDelimiter=",",b.Parser=E,b.ParserHandle=r,b.NetworkStreamer=l,b.FileStreamer=c,b.StringStreamer=p,b.ReadableStreamStreamer=g,f.jQuery){var d=f.jQuery;d.fn.parse=function(o){var r=o.config||{},u=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&f.FileReader)||!this.files||0===this.files.length)return !0;for(var t=0;t<this.files.length;t++)u.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},r)});}),e(),this;function e(){if(0!==u.length){var e,t,r,i,n=u[0];if(J(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,r=n.inputElem,i=s.reason,void(J(o.error)&&o.error({name:e},t,r,i));if("skip"===s.action)return void h();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config));}else if("skip"===s)return void h()}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){J(a)&&a(e,n.file,n.inputElem),h();},b.parse(n.file,n.instanceConfig);}else J(o.complete)&&o.complete();}function h(){u.splice(0,1),e();}};}function h(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=w(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new r(t),(this._handle.streamer=this)._config=t;}.call(this,e),this.parseChunk=function(e,t){if(this.isFirstChunk&&J(this._config.beforeFirstChunk)){var r=this._config.beforeFirstChunk(e);void 0!==r&&(e=r);}this.isFirstChunk=!1,this._halted=!1;var i=this._partialLine+e;this._partialLine="";var n=this._handle.parse(i,this._baseIndex,!this._finished);if(!this._handle.paused()&&!this._handle.aborted()){var s=n.meta.cursor;this._finished||(this._partialLine=i.substring(s-this._baseIndex),this._baseIndex=s),n&&n.data&&(this._rowCount+=n.data.length);var a=this._finished||this._config.preview&&this._rowCount>=this._config.preview;if(o)f.postMessage({results:n,workerId:b.WORKER_ID,finished:a});else if(J(this._config.chunk)&&!t){if(this._config.chunk(n,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);n=void 0,this._completeResults=void 0;}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(n.data),this._completeResults.errors=this._completeResults.errors.concat(n.errors),this._completeResults.meta=n.meta),this._completed||!a||!J(this._config.complete)||n&&n.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),a||n&&n.meta.paused||this._nextChunk(),n}this._halted=!0;},this._sendError=function(e){J(this._config.error)?this._config.error(e):o&&this._config.error&&f.postMessage({workerId:b.WORKER_ID,error:e,finished:!1});};}function l(e){var i;(e=e||{}).chunkSize||(e.chunkSize=b.RemoteChunkSize),h.call(this,e),this._nextChunk=n?function(){this._readChunk(),this._chunkLoaded();}:function(){this._readChunk();},this.stream=function(e){this._input=e,this._nextChunk();},this._readChunk=function(){if(this._finished)this._chunkLoaded();else {if(i=new XMLHttpRequest,this._config.withCredentials&&(i.withCredentials=this._config.withCredentials),n||(i.onload=v(this._chunkLoaded,this),i.onerror=v(this._chunkError,this)),i.open(this._config.downloadRequestBody?"POST":"GET",this._input,!n),this._config.downloadRequestHeaders){var e=this._config.downloadRequestHeaders;for(var t in e)i.setRequestHeader(t,e[t]);}if(this._config.chunkSize){var r=this._start+this._config.chunkSize-1;i.setRequestHeader("Range","bytes="+this._start+"-"+r);}try{i.send(this._config.downloadRequestBody);}catch(e){this._chunkError(e.message);}n&&0===i.status&&this._chunkError();}},this._chunkLoaded=function(){4===i.readyState&&(i.status<200||400<=i.status?this._chunkError():(this._start+=this._config.chunkSize?this._config.chunkSize:i.responseText.length,this._finished=!this._config.chunkSize||this._start>=function(e){var t=e.getResponseHeader("Content-Range");if(null===t)return -1;return parseInt(t.substring(t.lastIndexOf("/")+1))}(i),this.parseChunk(i.responseText)));},this._chunkError=function(e){var t=i.statusText||e;this._sendError(new Error(t));};}function c(e){var i,n;(e=e||{}).chunkSize||(e.chunkSize=b.LocalChunkSize),h.call(this,e);var s="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,n=e.slice||e.webkitSlice||e.mozSlice,s?((i=new FileReader).onload=v(this._chunkLoaded,this),i.onerror=v(this._chunkError,this)):i=new FileReaderSync,this._nextChunk();},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk();},this._readChunk=function(){var e=this._input;if(this._config.chunkSize){var t=Math.min(this._start+this._config.chunkSize,this._input.size);e=n.call(e,this._start,t);}var r=i.readAsText(e,this._config.encoding);s||this._chunkLoaded({target:{result:r}});},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result);},this._chunkError=function(){this._sendError(i.error);};}function p(e){var r;h.call(this,e=e||{}),this.stream=function(e){return r=e,this._nextChunk()},this._nextChunk=function(){if(!this._finished){var e,t=this._config.chunkSize;return t?(e=r.substring(0,t),r=r.substring(t)):(e=r,r=""),this._finished=!r,this.parseChunk(e)}};}function g(e){h.call(this,e=e||{});var t=[],r=!0,i=!1;this.pause=function(){h.prototype.pause.apply(this,arguments),this._input.pause();},this.resume=function(){h.prototype.resume.apply(this,arguments),this._input.resume();},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError);},this._checkIsFinished=function(){i&&1===t.length&&(this._finished=!0);},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):r=!0;},this._streamData=v(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),r&&(r=!1,this._checkIsFinished(),this.parseChunk(t.shift()));}catch(e){this._streamError(e);}},this),this._streamError=v(function(e){this._streamCleanUp(),this._sendError(e);},this),this._streamEnd=v(function(){this._streamCleanUp(),i=!0,this._streamData("");},this),this._streamCleanUp=v(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError);},this);}function r(m){var a,o,u,i=Math.pow(2,53),n=-i,s=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,h=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,t=this,r=0,f=0,d=!1,e=!1,l=[],c={data:[],errors:[],meta:{}};if(J(m.step)){var p=m.step;m.step=function(e){if(c=e,_())g();else {if(g(),0===c.data.length)return;r+=e.data.length,m.preview&&r>m.preview?o.abort():(c.data=c.data[0],p(c,t));}};}function y(e){return "greedy"===m.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length}function g(){return c&&u&&(k("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+b.DefaultDelimiter+"'"),u=!1),m.skipEmptyLines&&(c.data=c.data.filter(function(e){return !y(e)})),_()&&function(){if(!c)return;function e(e,t){J(m.transformHeader)&&(e=m.transformHeader(e,t)),l.push(e);}if(Array.isArray(c.data[0])){for(var t=0;_()&&t<c.data.length;t++)c.data[t].forEach(e);c.data.splice(0,1);}else c.data.forEach(e);}(),function(){if(!c||!m.header&&!m.dynamicTyping&&!m.transform)return c;function e(e,t){var r,i=m.header?{}:[];for(r=0;r<e.length;r++){var n=r,s=e[r];m.header&&(n=r>=l.length?"__parsed_extra":l[r]),m.transform&&(s=m.transform(s,n)),s=v(n,s),"__parsed_extra"===n?(i[n]=i[n]||[],i[n].push(s)):i[n]=s;}return m.header&&(r>l.length?k("FieldMismatch","TooManyFields","Too many fields: expected "+l.length+" fields but parsed "+r,f+t):r<l.length&&k("FieldMismatch","TooFewFields","Too few fields: expected "+l.length+" fields but parsed "+r,f+t)),i}var t=1;!c.data.length||Array.isArray(c.data[0])?(c.data=c.data.map(e),t=c.data.length):c.data=e(c.data,0);m.header&&c.meta&&(c.meta.fields=l);return f+=t,c}()}function _(){return m.header&&0===l.length}function v(e,t){return r=e,m.dynamicTypingFunction&&void 0===m.dynamicTyping[r]&&(m.dynamicTyping[r]=m.dynamicTypingFunction(r)),!0===(m.dynamicTyping[r]||m.dynamicTyping)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&(function(e){if(s.test(e)){var t=parseFloat(e);if(n<t&&t<i)return !0}return !1}(t)?parseFloat(t):h.test(t)?new Date(t):""===t?null:t):t;var r;}function k(e,t,r,i){var n={type:e,code:t,message:r};void 0!==i&&(n.row=i),c.errors.push(n);}this.parse=function(e,t,r){var i=m.quoteChar||'"';if(m.newline||(m.newline=function(e,t){e=e.substring(0,1048576);var r=new RegExp(Q(t)+"([^]*?)"+Q(t),"gm"),i=(e=e.replace(r,"")).split("\r"),n=e.split("\n"),s=1<n.length&&n[0].length<i[0].length;if(1===i.length||s)return "\n";for(var a=0,o=0;o<i.length;o++)"\n"===i[o][0]&&a++;return a>=i.length/2?"\r\n":"\r"}(e,i)),u=!1,m.delimiter)J(m.delimiter)&&(m.delimiter=m.delimiter(e),c.meta.delimiter=m.delimiter);else {var n=function(e,t,r,i,n){var s,a,o,u;n=n||[",","\t","|",";",b.RECORD_SEP,b.UNIT_SEP];for(var h=0;h<n.length;h++){var f=n[h],d=0,l=0,c=0;o=void 0;for(var p=new E({comments:i,delimiter:f,newline:t,preview:10}).parse(e),g=0;g<p.data.length;g++)if(r&&y(p.data[g]))c++;else {var _=p.data[g].length;l+=_,void 0!==o?0<_&&(d+=Math.abs(_-o),o=_):o=_;}0<p.data.length&&(l/=p.data.length-c),(void 0===a||d<=a)&&(void 0===u||u<l)&&1.99<l&&(a=d,s=f,u=l);}return {successful:!!(m.delimiter=s),bestDelimiter:s}}(e,m.newline,m.skipEmptyLines,m.comments,m.delimitersToGuess);n.successful?m.delimiter=n.bestDelimiter:(u=!0,m.delimiter=b.DefaultDelimiter),c.meta.delimiter=m.delimiter;}var s=w(m);return m.preview&&m.header&&s.preview++,a=e,o=new E(s),c=o.parse(a,t,r),g(),d?{meta:{paused:!0}}:c||{meta:{paused:!1}}},this.paused=function(){return d},this.pause=function(){d=!0,o.abort(),a=J(m.chunk)?"":a.substring(o.getCharIndex());},this.resume=function(){t.streamer._halted?(d=!1,t.streamer.parseChunk(a,!0)):setTimeout(t.resume,3);},this.aborted=function(){return e},this.abort=function(){e=!0,o.abort(),c.meta.aborted=!0,J(m.complete)&&m.complete(c),a="";};}function Q(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function E(j){var z,M=(j=j||{}).delimiter,P=j.newline,U=j.comments,q=j.step,N=j.preview,B=j.fastMode,K=z=void 0===j.quoteChar||null===j.quoteChar?'"':j.quoteChar;if(void 0!==j.escapeChar&&(K=j.escapeChar),("string"!=typeof M||-1<b.BAD_DELIMITERS.indexOf(M))&&(M=","),U===M)throw new Error("Comment character same as delimiter");!0===U?U="#":("string"!=typeof U||-1<b.BAD_DELIMITERS.indexOf(U))&&(U=!1),"\n"!==P&&"\r"!==P&&"\r\n"!==P&&(P="\n");var W=0,H=!1;this.parse=function(i,t,r){if("string"!=typeof i)throw new Error("Input must be a string");var n=i.length,e=M.length,s=P.length,a=U.length,o=J(q),u=[],h=[],f=[],d=W=0;if(!i)return L();if(j.header&&!t){var l=i.split(P)[0].split(M),c=[],p={},g=!1;for(var _ in l){var m=l[_];J(j.transformHeader)&&(m=j.transformHeader(m,_));var y=m,v=p[m]||0;for(0<v&&(g=!0,y=m+"_"+v),p[m]=v+1;c.includes(y);)y=y+"_"+v;c.push(y);}if(g){var k=i.split(P);k[0]=c.join(M),i=k.join(P);}}if(B||!1!==B&&-1===i.indexOf(z)){for(var b=i.split(P),E=0;E<b.length;E++){if(f=b[E],W+=f.length,E!==b.length-1)W+=P.length;else if(r)return L();if(!U||f.substring(0,a)!==U){if(o){if(u=[],I(f.split(M)),F(),H)return L()}else I(f.split(M));if(N&&N<=E)return u=u.slice(0,N),L(!0)}}return L()}for(var w=i.indexOf(M,W),R=i.indexOf(P,W),C=new RegExp(Q(K)+Q(z),"g"),S=i.indexOf(z,W);;)if(i[W]!==z)if(U&&0===f.length&&i.substring(W,W+a)===U){if(-1===R)return L();W=R+s,R=i.indexOf(P,W),w=i.indexOf(M,W);}else if(-1!==w&&(w<R||-1===R))f.push(i.substring(W,w)),W=w+e,w=i.indexOf(M,W);else {if(-1===R)break;if(f.push(i.substring(W,R)),D(R+s),o&&(F(),H))return L();if(N&&u.length>=N)return L(!0)}else for(S=W,W++;;){if(-1===(S=i.indexOf(z,S+1)))return r||h.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:u.length,index:W}),T();if(S===n-1)return T(i.substring(W,S).replace(C,z));if(z!==K||i[S+1]!==K){if(z===K||0===S||i[S-1]!==K){-1!==w&&w<S+1&&(w=i.indexOf(M,S+1)),-1!==R&&R<S+1&&(R=i.indexOf(P,S+1));var O=A(-1===R?w:Math.min(w,R));if(i.substr(S+1+O,e)===M){f.push(i.substring(W,S).replace(C,z)),i[W=S+1+O+e]!==z&&(S=i.indexOf(z,W)),w=i.indexOf(M,W),R=i.indexOf(P,W);break}var x=A(R);if(i.substring(S+1+x,S+1+x+s)===P){if(f.push(i.substring(W,S).replace(C,z)),D(S+1+x+s),w=i.indexOf(M,W),S=i.indexOf(z,W),o&&(F(),H))return L();if(N&&u.length>=N)return L(!0);break}h.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:u.length,index:W}),S++;}}else S++;}return T();function I(e){u.push(e),d=W;}function A(e){var t=0;if(-1!==e){var r=i.substring(S+1,e);r&&""===r.trim()&&(t=r.length);}return t}function T(e){return r||(void 0===e&&(e=i.substring(W)),f.push(e),W=n,I(f),o&&F()),L()}function D(e){W=e,I(f),f=[],R=i.indexOf(P,W);}function L(e){return {data:u,errors:h,meta:{delimiter:M,linebreak:P,aborted:H,truncated:!!e,cursor:d+(t||0)}}}function F(){q(L()),u=[],h=[];}},this.abort=function(){H=!0;},this.getCharIndex=function(){return W};}function _(e){var t=e.data,r=a[t.workerId],i=!1;if(t.error)r.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){i=!0,m(t.workerId,{data:[],errors:[],meta:{aborted:!0}});},pause:y,resume:y};if(J(r.userStep)){for(var s=0;s<t.results.data.length&&(r.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},n),!i);s++);delete t.results;}else J(r.userChunk)&&(r.userChunk(t.results,n,t.file),delete t.results);}t.finished&&!i&&m(t.workerId,t.results);}function m(e,t){var r=a[e];J(r.userComplete)&&r.userComplete(t),r.terminate(),delete a[e];}function y(){throw new Error("Not implemented.")}function w(e){if("object"!=typeof e||null===e)return e;var t=Array.isArray(e)?[]:{};for(var r in e)t[r]=w(e[r]);return t}function v(e,t){return function(){e.apply(t,arguments);}}function J(e){return "function"==typeof e}return o&&(f.onmessage=function(e){var t=e.data;void 0===b.WORKER_ID&&t&&(b.WORKER_ID=t.workerId);if("string"==typeof t.input)f.postMessage({workerId:b.WORKER_ID,results:b.parse(t.input,t.config),finished:!0});else if(f.File&&t.input instanceof File||t.input instanceof Object){var r=b.parse(t.input,t.config);r&&f.postMessage({workerId:b.WORKER_ID,results:r,finished:!0});}}),(l.prototype=Object.create(h.prototype)).constructor=l,(c.prototype=Object.create(h.prototype)).constructor=c,(p.prototype=Object.create(p.prototype)).constructor=p,(g.prototype=Object.create(h.prototype)).constructor=g,b}); 
} (papaparse_min));

var papaparse_minExports = papaparse_min.exports;

class Csv {
  csv = [];
  path;
  isRead = false;
  areHeadersPresent = false;
  validator;
  constructor(path, validator, areHeadersPresent) {
    this.path = path;
    this.areHeadersPresent = !!areHeadersPresent;
    if (validator) {
      this.validator = (data) => {
        console.log("Validating:", data);
        const isValid = validator(data);
        if (isValid !== true)
          throw new AlertError(`Invalid cell in ${this.path}. ${isValid}: ${JSON.stringify(data)}`);
      };
    }
  }
  ingest = async () => {
    if (this.isRead)
      return;
    const res = await fetch(this.path);
    const data = await res.text();
    console.log("Read Data", { data });
    papaparse_minExports.parse(data, {
      header: this.areHeadersPresent,
      complete: this.onParse,
      delimitersToGuess: ["|", "	"],
      transform: this.trimCell,
      transformHeader: this.trimCell
    });
  };
  trimCell = (cell) => {
    return cell.trim();
  };
  onParse = (res) => {
    const actualErrs = res.errors.filter((e) => {
      return e.code !== "UndetectableDelimiter";
    });
    if (actualErrs.length) {
      console.error(actualErrs);
      throw new AlertError("Parse Error");
    }
    if (this.validator)
      res.data.map(this.validator);
    this.csv = res.data;
  };
  getCsv = () => {
    return this.csv;
  };
}

const App_svelte_svelte_type_style_lang = '';

/* C:/Users/LENOVO/Documents/workspace/fightmilkcrossword/src/App.svelte generated by Svelte v4.2.0 */

function create_catch_block(ctx) {
	return {
		c: noop,
		m: noop,
		p: noop,
		i: noop,
		o: noop,
		d: noop
	};
}

// (70:8) {:then _}
function create_then_block(ctx) {
	let div0;
	let loading;
	let t0;
	let div1;
	let header;
	let t1;
	let br;
	let t2;
	let board_1;
	let current;
	loading = new Loading({});

	header = new Header({
			props: {
				answerKey: /*answerKeyCsv*/ ctx[1].getCsv(),
				board: /*board*/ ctx[2]
			}
		});

	board_1 = new Board({ props: { board: /*board*/ ctx[2] } });

	return {
		c() {
			div0 = element("div");
			create_component(loading.$$.fragment);
			t0 = space();
			div1 = element("div");
			create_component(header.$$.fragment);
			t1 = space();
			br = element("br");
			t2 = space();
			create_component(board_1.$$.fragment);
			attr(div0, "class", "svelte-1u0764s");
			toggle_class(div0, "hide", !/*isLoading*/ ctx[0]);
			attr(div1, "class", "svelte-1u0764s");
			toggle_class(div1, "hide", /*isLoading*/ ctx[0]);
		},
		m(target, anchor) {
			insert(target, div0, anchor);
			mount_component(loading, div0, null);
			insert(target, t0, anchor);
			insert(target, div1, anchor);
			mount_component(header, div1, null);
			append(div1, t1);
			append(div1, br);
			append(div1, t2);
			mount_component(board_1, div1, null);
			current = true;
		},
		p(ctx, dirty) {
			if (!current || dirty & /*isLoading*/ 1) {
				toggle_class(div0, "hide", !/*isLoading*/ ctx[0]);
			}

			const header_changes = {};
			if (dirty & /*answerKeyCsv*/ 2) header_changes.answerKey = /*answerKeyCsv*/ ctx[1].getCsv();
			if (dirty & /*board*/ 4) header_changes.board = /*board*/ ctx[2];
			header.$set(header_changes);
			const board_1_changes = {};
			if (dirty & /*board*/ 4) board_1_changes.board = /*board*/ ctx[2];
			board_1.$set(board_1_changes);

			if (!current || dirty & /*isLoading*/ 1) {
				toggle_class(div1, "hide", /*isLoading*/ ctx[0]);
			}
		},
		i(local) {
			if (current) return;
			transition_in(loading.$$.fragment, local);
			transition_in(header.$$.fragment, local);
			transition_in(board_1.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(loading.$$.fragment, local);
			transition_out(header.$$.fragment, local);
			transition_out(board_1.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(div0);
				detach(t0);
				detach(div1);
			}

			destroy_component(loading);
			destroy_component(header);
			destroy_component(board_1);
		}
	};
}

// (68:36)               <Loading />          {:then _}
function create_pending_block(ctx) {
	let loading;
	let current;
	loading = new Loading({});

	return {
		c() {
			create_component(loading.$$.fragment);
		},
		m(target, anchor) {
			mount_component(loading, target, anchor);
			current = true;
		},
		p: noop,
		i(local) {
			if (current) return;
			transition_in(loading.$$.fragment, local);
			current = true;
		},
		o(local) {
			transition_out(loading.$$.fragment, local);
			current = false;
		},
		d(detaching) {
			destroy_component(loading, detaching);
		}
	};
}

function create_fragment(ctx) {
	let main;
	let div;
	let current;

	let info = {
		ctx,
		current: null,
		token: null,
		hasCatch: false,
		pending: create_pending_block,
		then: create_then_block,
		catch: create_catch_block,
		value: 9,
		blocks: [,,,]
	};

	handle_promise(/*isBoardReadyPromise*/ ctx[3], info);

	return {
		c() {
			main = element("main");
			div = element("div");
			info.block.c();
		},
		m(target, anchor) {
			insert(target, main, anchor);
			append(main, div);
			info.block.m(div, info.anchor = null);
			info.mount = () => div;
			info.anchor = null;
			current = true;
		},
		p(new_ctx, [dirty]) {
			ctx = new_ctx;
			update_await_block_branch(info, ctx, dirty);
		},
		i(local) {
			if (current) return;
			transition_in(info.block);
			current = true;
		},
		o(local) {
			for (let i = 0; i < 3; i += 1) {
				const block = info.blocks[i];
				transition_out(block);
			}

			current = false;
		},
		d(detaching) {
			if (detaching) {
				detach(main);
			}

			info.block.d();
			info.token = null;
			info = null;
		}
	};
}

const boardCsvSource = "/board.csv";
const answerKeyCsvSource = "/answerKey.csv";

function instance($$self, $$props, $$invalidate) {
	let isLoading = true;
	let boardCsv;
	let answerKeyCsv;

	onMount(() => {
		const WAIT_TIME = 10 * 1e3;

		setTimeout(
			() => {
				$$invalidate(0, isLoading = false);
			},
			WAIT_TIME
		);
	});

	const boardValidator = data => {
		if (!Array.isArray(data)) return "Data is not an array!";
		let reason = void 0;

		data.forEach(e => {
			if (reason) return;

			if (typeof e !== "string") {
				reason = `${JSON.stringify(e)} is not a string!`;
				return;
			}

			const isBoarder = e === "xx";
			const isEmpty = e === "";
			const isLetter = e.length === 1;

			if (!(isBoarder || isEmpty || isLetter)) {
				reason = `${JSON.stringify(e)} is not a cell or border!`;
			}
		});

		return reason || true;
	};

	const answerKeyValidator = data => {
		const strData = JSON.stringify(data);
		if (typeof data !== "object") return strData + " is not an object!";
		if (!data) return strData + " is falsy!";
		if (!("clue" in data)) return strData + " does not have a clue!";
		if (!("answer" in data)) return strData + " does not have an answer!";

		if (!data.answer.match(/[a-zA-Z]+/)) {
			return strData + " does not format answer correctly!";
		}

		return true;
	};

	boardCsv = new Csv(boardCsvSource, boardValidator, false);
	const boardPromise = boardCsv.ingest();
	answerKeyCsv = new Csv(answerKeyCsvSource, answerKeyValidator, true);
	const answerKeyPromise = answerKeyCsv.ingest();
	const isBoardReadyPromise = Promise.all([boardPromise, answerKeyPromise]);
	let board;

	boardPromise.then(() => {
		const boardCsvContent = boardCsv.getCsv();
		$$invalidate(2, board = new BoardModule(boardCsvContent));
		BoardSingleton.set(board);
	});

	return [isLoading, answerKeyCsv, board, isBoardReadyPromise];
}

class App extends SvelteComponent {
	constructor(options) {
		super();
		init(this, options, instance, create_fragment, safe_not_equal, {});
	}
}

new App({
  // safe to cast since it is defined in index.html
  target: document.getElementById("app")
});
