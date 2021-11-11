# UiSwitch
The UiSwitch component is a flexible alternative to the non existing but widely used "switch" type input.

## Features ✨

 <ul>
  <li>Vue 3</li>
  <li>Fully accessible</li>
  <li>Easily customisable with CSS</li>
  <li>Familiar input element experience</li>
 <li>Can be controlled or uncontrolled</li>
  <li>Renders a visually hidden input element</li>
 </ul>
 
## Props ⚙

<table>
 <thead>
  <tr>
    <th>Name</th><th>Type</th><th>Default</th><th>Description</th>
  </tr>
 </thead>
 <tbody>
  <tr>
    <td>modelValue</td><td><code>Boolean</code></td><td>undefined</td><td>Used internally by <code>v-model</code></td>
  </tr>
  <tr>
   <td>tag</td><td><code>String</code></td><td>button</td><td>This is the root tag that will be rendered. Mainly for semantics or core web functionality. Preferably a <code>HTMLElement</code></td>
  </tr>
   <tr>
   <td>id</td><td><code>String</code></td><td>button</td><td>This is useful if you want to control the internal <code>&lt;input/&gt;</code> with another element, mostly a <code>&lt;label&gt;</code></td>
  </tr>
  <tr>
   <td>required</td><td><code>Boolean</code></td><td>undefined</td><td>This is used if the UiSwitch will be used as a required field in a form
</td>
  </tr>
   <tr>
   <td>readonly</td><td><code>Boolean</code></td><td>undefined</td><td>This is adds the readonly attribute the the internal <code>&lt;input/&gt;</code></td>
  </tr>
   <tr>
   <td>disabled</td><td><code>Boolean</code></td><td>undefined</td><td>This is used to completely disable the UiSwitch</td>
  </tr>
   <tr>
   <td>validate</td><td><code>Function</code></td><td>undefined</td><td>Use this prop if you wish to validate the current value of an input. The function is expected to return a <code>String</code> of an error message which will be set on the internal <code>&lt;input/&gt;</code> or <code>true</code> if the current value is accepted</td>
  </tr>
  <tr>
   <td>initial</td><td><code>Boolean</code></td><td>undefined</td><td>This is used to set the initial state when no <code>v-model</code> is used</td>
  </tr>
   <tr>
   <td>height</td><td><code>[String, Number]</code></td><td>undefined</td><td>This is used to set the height of the root element. This prop basically sets a the <code>--ui-height</code> CSS variable on the style attribute</td>
  </tr>
    <tr>
   <td>width</td><td><code>[String, Number]</code></td><td>undefined</td><td>This is used to set the width of the root element. This prop basically sets a the <code>--ui-width</code> CSS variable on the style attribute</td>
  </tr>
 </tbody>
</table>


## Structure 🏗

<pre><code>&lt;slot name='prepend'/&gt;
    
 &lt;props.tag data-ui-switch='' class='root'>
    &lt;div class='track'&gt;
      &lt;slot name='track'/&gt;
    &lt;/div&gt;
      
    &lt;div class='thumb'&gt;
      &lt;input/>
      &lt;slot name='thumb'/&gt;
    &lt;/div&gt;
 &lt;/props.tag> 
     
&lt;slot name='append'/&gt;   
</code></pre>

## Slots 🎰 

<table>
 <thead>
  <tr>
    <th>Name</th><th>Payload</th><th>Description</th>
  </tr>
 </thead>
 <tbody>
  <tr>
    <td>prepend</td><td>
    <pre><code>{ 
  active: Boolean,
  validation: {
    message: '',
    valid: true
  },
  toggle: Function
}
</code></pre></td><td>Use this slot to render something else before the root component, commonly used for prepending a <code>&lt;label/&gt;</code></td>
  </tr>
   <tr>
     <td>track</td><td>Same as <em>prepend</em></td><td>Use this slot to render anything inside the <code>.track</code> element</td>
  </tr>
   <tr>
     <td>thumb</td><td>Same as <em>prepend</em></td><td>Use this slot to render anything inside the <code>.thumb</code> element</td>
  </tr>
   <tr>
     <td>default</td><td>Same as <em>prepend</em></td><td>Use this slot to render anything inside the root element</td>
  </tr>
   <tr>
     <td>append</td><td>Same as <em>prepend</em></td><td>Use this slot to render something else after the root component, commonly used for appending a <code>&lt;label/&gt;</code></td>
  </tr>
 </tbody>
</table>

<em>All slots are optional, and can accept multiple elements</em>

## Examples 💁‍♀️

 <em>Simplest form</em>
 
<pre><code>&lt;div id='app'&gt;
 &lt;UiSwitch/&gt;
&lt;/div&gt;
</code></pre>

<em>With v-model</em>
 
<pre><code>&lt;div id='app'&gt;
 &lt;UiSwitch v-model='switch'/&gt;
&lt;/div&gt;
</code></pre>

<em>With an external</em> <code>&lt;label&gt;</code>
 
<pre><code>&lt;div id='app'&gt;
 &lt;label for='switch'&gt;
  Toggle UiSwitch
 &lt;/label&gt;
 
 &lt;UiSwitch id='switch' v-model='switch'/&gt;
&lt;/div&gt;
</code></pre>

<em>With an internal</em> <code>&lt;label&gt;</code> <em>(prepend) and an internal validation message</em> <code>&lt;span&gt;</code> <em>(append)</em>
 
<pre><code>&lt;div id='app'&gt;
 &lt;UiSwitch id='switch'&gt;
  &lt;template v-slot:prepend='{active}'&gt;
    &lt;label for='switch'&gt;
     Selected: {{active}}
    &lt;/label&gt;  
  &lt;/template&gt;
  
  &lt;template v-slot:append='{validation, toggle}'&gt;
    &lt;span v-if='validation.message' @click='toggle'&gt;
     Error!
    &lt;/span&gt;
  &lt;/template&gt;
 &lt;/UiSwitch&gt;
&lt;/div&gt;
</code></pre>

## CSS variables 
<table>
 <thead>
  <tr>
    <th>Name</th><th>Default value</th><th>Description</th>
  </tr>
 </thead>
 <tbody>
  <tr>
    <td>--ui-height</td><td>28px</td><td>Use this variable to set the root element's height</td>
  </tr>
   <tr>
     <td>--ui-width</td><td>44px</td><td>Use this variable to set the root element's width</td>
  </tr>
   <tr>
     <td>--ui-track-height</td><td>100%</td><td>Sets the height of the track</td>
  </tr>
  <tr>
     <td>--ui-track-radius</td><td>100%</td><td>Sets the border-radius of the track</td>
  </tr>
 <tr>
     <td>--ui-track-background</td><td>#999</td><td>Sets the background of the track</td>
  </tr>
    <tr>
     <td>--ui-track-background-checked</td><td>#007bff</td><td>Sets the background of the track when the component is active</td>
  </tr>
    <tr>
      <td>--ui-thumb-size</td><td>25px</td><td>Sets the height and width of the <code>.thumb</code> element</td>
  </tr>
    <tr>
      <td>--ui-thumb-radius</td><td>50%</td><td>Sets the border-radius of the <code>.thumb</code> element</td>
  </tr>
    <tr>
      <td>--ui-thumb-offset</td><td>1.5px</td><td>The gap between the thumb and the edges</td>
  </tr>
    <tr>
      <td>--ui-thumb-translatex</td><td>
<pre><code>calc(var(--ui-width) - 
   var(--ui-thumb-size) - 
   var(--ui-thumb-offset)
)</code></pre></td><td>Computes the active state transformation</td>
  </tr>
  <tr>
      <td>--ui-thumb-background</td><td>#fff</td><td>The background of the thumb</td>
  </tr>
 </tbody>
</table>
