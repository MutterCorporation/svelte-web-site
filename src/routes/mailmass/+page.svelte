<script>
    import Header from '../../components/Header.svelte'
</script>


<div> Mail Mass </div>
<form>
  <div class="group">
    <label for="file">Upload your file</label>
    <input
      type="file"
      id="file"
      name="fileToUpload"
      required
    />
  </div>

  <button type="submit">Submit</button>
</form>

<style>
    div {
        background-color: red;
        width: 100%;
    }
</style>